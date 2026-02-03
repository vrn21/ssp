/**
 * Artifact Templates Configuration
 * 
 * Each artifact defines a section type that can be added to the document.
 * Icons use Lucide icon names (string identifiers) for maintainability.
 * Templates are structured for easy API replacement.
 */

export const ARTIFACT_TEMPLATES = [
  {
    id: 'problem-statement',
    title: 'Problem Statement',
    icon: 'Target',
    description: 'Define the problem you are solving',
    prompts: {
      'The Problem': [
        "What pain point or gap exists in the market?",
        "What is broken today?",
        "Why is this a significant problem?"
      ],
      'Who Experiences This?': [
        "Describe your target user in detail.",
        "Who feels this pain the most?",
        "What is their current workflow?"
      ],
      'Current Alternatives': [
        "How do people solve this problem today?",
        "What are the makeshift solutions?",
        "Why are existing solutions inadequate?"
      ],
      'Why Now?': [
        "What has changed that makes this the right time?",
        "Why hasn't this been solved before?",
        "What macro trends are in your favor?"
      ]
    },
    defaultContent: `
<h2>Problem Statement</h2>
<h3>The Problem</h3>
<p></p>
<h3>Who Experiences This?</h3>
<p></p>
<h3>Current Alternatives</h3>
<p></p>
<h3>Why Now?</h3>
<p></p>
`
  },
  {
    id: 'founder-profile',
    title: 'Founder Profile',
    icon: 'User',
    description: 'Background and experience of founders',
    prompts: {
      'Background': [
        "Share your journey — what led you here?",
        "What is your personal connection to the problem?",
        "What were you doing before this?"
      ],
      'Why This Problem?': [
        "What makes you uniquely positioned to solve this?",
        "Why are you the right person for this?",
        "What is your unfair advantage?"
      ]
    },
    defaultContent: `
<h2>Founder Profile</h2>
<h3>Background</h3>
<p></p>
<h3>Key Strengths</h3>
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
<h3>Relevant Experience</h3>
<ul>
  <li></li>
  <li></li>
</ul>
<h3>Why This Problem?</h3>
<p></p>
`
  },
  {
    id: 'solution-hypothesis',
    title: 'Solution Hypothesis',
    icon: 'Lightbulb',
    description: 'Your proposed solution and value prop',
    prompts: {
      'Core Solution': [
        "What are you building? Describe it simply.",
        "How does it work?",
        "What is the core mechanic?"
      ],
      'Unique Value Proposition': [
        "Why will customers choose you over alternatives?",
        "What is 10x better?",
        "What is your moat?"
      ]
    },
    defaultContent: `
<h2>Solution Hypothesis</h2>
<h3>Core Solution</h3>
<p></p>
<h3>Key Features</h3>
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
<h3>Unique Value Proposition</h3>
<p></p>
<h3>Assumptions to Validate</h3>
<ul>
  <li></li>
  <li></li>
</ul>
`
  },
  {
    id: 'market-notes',
    title: 'Market Notes',
    icon: 'BarChart3',
    description: 'Market size and competitive landscape',
    prompts: {
      'Competitive Landscape': [
        "Who else is in this space? How are you different?",
        "What are the incumbents missing?",
        "Who are the new entrants?"
      ]
    },
    defaultContent: `
<h2>Market Notes</h2>
<h3>Market Size</h3>
<ul>
  <li>TAM (Total Addressable Market): </li>
  <li>SAM (Serviceable Addressable Market): </li>
  <li>SOM (Serviceable Obtainable Market): </li>
</ul>
<h3>Market Trends</h3>
<ul>
  <li></li>
  <li></li>
</ul>
<h3>Competitive Landscape</h3>
<p></p>
`
  },
  {
    id: 'team',
    title: 'Team',
    icon: 'Users',
    description: 'Core team, advisors, and key hires',
    prompts: {},
    defaultContent: `
<h2>Team</h2>
<h3>Core Team</h3>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
      <th>Background</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
<h3>Advisory Board</h3>
<ul>
  <li></li>
</ul>
<h3>Key Hires Needed</h3>
<ul>
  <li></li>
</ul>
`
  },
  {
    id: 'funding-runway',
    title: 'Funding & Runway',
    icon: 'Wallet',
    description: 'Financial status and funding plans',
    prompts: {
      'Use of Funds': [
        "How will you allocate the next round?",
        "What are the key hires?",
        "What are the product milestones?"
      ],
      'Milestones': [
        "What will you achieve with this funding?",
        "What is the next valuation inflexion point?",
        "What is the timeline?"
      ]
    },
    defaultContent: `
<h2>Funding & Runway</h2>
<h3>Current Status</h3>
<ul>
  <li>Stage: </li>
  <li>Raised to date: </li>
  <li>Current runway: </li>
</ul>
<h3>Use of Funds</h3>
<p></p>
<h3>Milestones</h3>
<p></p>
`
  },
  {
    id: 'risks-unknowns',
    title: 'Risks & Unknowns',
    icon: 'AlertTriangle',
    description: 'Key risks and open questions',
    prompts: {
      'Open Questions': [
        "Things you're still figuring out:",
        "What are known unknowns?",
        "What experiments do you need to run?"
      ],
      'Assumptions': [
        "What must be true for this to work?",
        "What is the riskiest assumption?",
        "What are you taking for granted?"
      ]
    },
    defaultContent: `
<h2>Risks & Unknowns</h2>
<h3>Key Risks</h3>
<table>
  <thead>
    <tr>
      <th>Risk</th>
      <th>Likelihood</th>
      <th>Impact</th>
      <th>Mitigation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
<h3>Open Questions</h3>
<p></p>
<ul>
  <li></li>
  <li></li>
</ul>
<h3>Assumptions</h3>
<p></p>
<ul>
  <li></li>
</ul>
`
  },
  {
    id: 'external-references',
    title: 'External References',
    icon: 'Link',
    description: 'Documents, links, and research sources',
    prompts: {},
    defaultContent: `
<h2>External References</h2>
<h3>Documents & Links</h3>
<ul>
  <li></li>
</ul>
<h3>Research & Data Sources</h3>
<ul>
  <li></li>
</ul>
<h3>Inspiration & Comparables</h3>
<ul>
  <li></li>
</ul>
`
  },
  {
    id: 'custom',
    title: 'Custom Section',
    icon: 'FileText',
    description: 'A blank section for anything else',
    prompts: {},
    defaultContent: null
  }
]

/**
 * Fetch artifact templates
 * Currently returns static data, can be swapped for API call
 */
export async function fetchArtifactTemplates() {
  // TODO: Replace with API call when ready
  // return fetch('/api/artifacts/templates').then(r => r.json())
  return ARTIFACT_TEMPLATES
}

/**
 * Get a single template by ID
 */
export function getArtifactTemplate(id) {
  return ARTIFACT_TEMPLATES.find(t => t.id === id)
}
