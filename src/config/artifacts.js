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
    defaultContent: `
<h2>Problem Statement</h2>
<h3>The Problem</h3>
<p>What pain point or gap exists in the market?</p>
<h3>Who Experiences This?</h3>
<p>Describe your target user in detail.</p>
<h3>Current Alternatives</h3>
<p>How do people solve this problem today?</p>
<h3>Why Now?</h3>
<p>What has changed that makes this the right time?</p>
`
  },
  {
    id: 'founder-profile',
    title: 'Founder Profile',
    icon: 'User',
    description: 'Background and experience of founders',
    defaultContent: `
<h2>Founder Profile</h2>
<h3>Background</h3>
<p>Share your journey — what led you here?</p>
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
<p>What makes you uniquely positioned to solve this?</p>
`
  },
  {
    id: 'solution-hypothesis',
    title: 'Solution Hypothesis',
    icon: 'Lightbulb',
    description: 'Your proposed solution and value prop',
    defaultContent: `
<h2>Solution Hypothesis</h2>
<h3>Core Solution</h3>
<p>What are you building? Describe it simply.</p>
<h3>Key Features</h3>
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
<h3>Unique Value Proposition</h3>
<p>Why will customers choose you over alternatives?</p>
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
<p>Who else is in this space? How are you different?</p>
`
  },
  {
    id: 'team',
    title: 'Team',
    icon: 'Users',
    description: 'Core team, advisors, and key hires',
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
    defaultContent: `
<h2>Funding & Runway</h2>
<h3>Current Status</h3>
<ul>
  <li>Stage: </li>
  <li>Raised to date: </li>
  <li>Current runway: </li>
</ul>
<h3>Use of Funds</h3>
<p>How will you allocate the next round?</p>
<h3>Milestones</h3>
<p>What will you achieve with this funding?</p>
`
  },
  {
    id: 'risks-unknowns',
    title: 'Risks & Unknowns',
    icon: 'AlertTriangle',
    description: 'Key risks and open questions',
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
<p>Things you're still figuring out:</p>
<ul>
  <li></li>
  <li></li>
</ul>
<h3>Assumptions</h3>
<p>What must be true for this to work?</p>
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
