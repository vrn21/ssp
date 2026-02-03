import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

// Configuration constants
const PAUSE_THRESHOLD = 1500 // ms
const PROMPT_FADE_DURATION = 1200 // ms for opacity transition in CSS

const pluginKey = new PluginKey('dynamicPlaceholder')

const getContextForNode = (doc, pos) => {
  // Find the last heading before this position
  let heading = 'default'
  try {
    // Iterate from 0 to pos to find the last heading
    doc.nodesBetween(0, pos, (node, nodePos) => {
      if (node.type.name === 'heading') {
        heading = node.textContent.trim()
      }
    })
  } catch (e) {
    console.error('Error getting context:', e)
  }
  return heading
}

export const DynamicPlaceholder = Extension.create({
  name: 'dynamicPlaceholder',

  addOptions() {
    return {
      prompts: {
        'default': [
            "What's on your mind?",
            "Elaborate on this...",
            "Anything else to add?",
            "What are the key details?"
        ]
      }
    }
  },

  addProseMirrorPlugins() {
    const promptPools = this.options.prompts
    
    // Ensure default exists
    if (!promptPools['default']) {
       promptPools['default'] = [
            "What's on your mind?",
            "Elaborate on this...",
            "Anything else to add?"
       ]
    }

    return [
      new Plugin({
        key: pluginKey,
        state: {
          init() {
            return {
              lastInputTime: Date.now(),
              isIdle: false,
              prompts: {}, // Map of section -> prompt index
              activePrompt: null, // Current prompt text
              activePos: null // Position for the prompt
            }
          },
          apply(tr, value, oldState, newState) {
            const now = Date.now()
            let nextState = { ...value }

            if (tr.docChanged || tr.selectionSet) {
              // User activity detected
              nextState.lastInputTime = now
              nextState.isIdle = false
              nextState.activePrompt = null
              nextState.activePos = null
            } else if (tr.getMeta('IDLE_TRIGGER')) {
              // Timer triggered idle state
              nextState.isIdle = true
              
              const { doc, selection } = newState
              const { $to } = selection
              
              if (doc.content.size > 2) {
                 const context = getContextForNode(doc, $to.pos)
                 // Get next prompt for this context
                 const pool = promptPools[context] || promptPools['default']
                 const index = (nextState.prompts[context] || 0) % pool.length
                 
                 nextState.activePrompt = pool[index]
                 nextState.activePos = $to.pos
                 
                 // Increment index for next time (non-persisted)
                 nextState.prompts[context] = index + 1
              }
            }
            
            return nextState
          }
        },
        props: {
          decorations(state) {
            const { doc, selection } = state
            const { isIdle, activePrompt, activePos } = pluginKey.getState(state)
            let decorations = []

            // 1. Empty Section Placeholder (Immediate)
            const { $from } = selection
            const parent = $from.parent
            
            // Check if current block is empty and we are inside it
            if (parent.type.name === 'paragraph' && parent.content.size === 0) {
               const context = getContextForNode(doc, $from.pos)
               const pool = promptPools[context] || promptPools['default']
               
               // Debugging to ensure we match correctly
               // console.log(`[DynamicPlaceholder] Context: "${context}", Found Pool:`, !!promptPools[context])
               
               const emptyPrompt = pool[0] // Use first one for new sections
               
               decorations.push(
                 Decoration.widget($from.pos, () => {
                   const span = document.createElement('span')
                   span.className = 'dynamic-placeholder empty-state'
                   span.textContent = emptyPrompt || 'Start writing...'
                   return span
                 }, { side: -1 })
               )
            }
            
            // 2. Continuation Placeholder (On Pause)
            if (isIdle && activePrompt && activePos !== null) {
              // Ensure we are still at that position
              if (selection.head === activePos) {
                 decorations.push(
                   Decoration.widget(activePos, () => {
                     const div = document.createElement('div')
                     div.className = 'dynamic-placeholder continuation-state'
                     div.textContent = activePrompt
                     return div
                   }, { side: 1 })
                 )
              }
            }

            return DecorationSet.create(doc, decorations)
          }
        },
        view(editorView) {
          let interval = setInterval(() => {
            const state = editorView.state
            const pluginState = pluginKey.getState(state)
            
            if (!pluginState.isIdle) {
              const now = Date.now()
              if (now - pluginState.lastInputTime > PAUSE_THRESHOLD) {
                // Dispatch transaction to trigger idle
                editorView.dispatch(editorView.state.tr.setMeta('IDLE_TRIGGER', true))
              }
            }
          }, 1000)

          return {
            destroy() {
              clearInterval(interval)
            }
          }
        }
      })
    ]
  }
})
