/**
 * WORKFLOW & ARCHITECTURE DIAGRAM RENDERER
 * Generates custom, responsive architecture flowcharts for each project case study.
 */

function renderWorkflowDiagram(workflowNodes) {
  if (!workflowNodes || workflowNodes.length === 0) {
    return `<p class="text-muted">Workflow specifications will be updated.</p>`;
  }

  const nodesHtml = workflowNodes.map((node, index) => {
    const isLast = index === workflowNodes.length - 1;
    return `
      <div class="pipeline-node">
        <span class="node-step-badge">Phase ${node.step}</span>
        <h5 class="node-title">${node.title}</h5>
        <p class="node-desc">${node.desc}</p>
      </div>
      ${!isLast ? `
        <div class="pipeline-connector" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      ` : ''}
    `;
  }).join('');

  return `
    <div class="workflow-container">
      <div class="workflow-diagram-header">
        <div class="workflow-diagram-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="6" height="6" rx="1"></rect>
            <rect x="16" y="2" width="6" height="6" rx="1"></rect>
            <rect x="9" y="16" width="6" height="6" rx="1"></rect>
            <path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"></path>
            <path d="M12 13v3"></path>
          </svg>
          System Architecture & Execution Pipeline
        </div>
      </div>
      <div class="workflow-pipeline">
        ${nodesHtml}
      </div>
    </div>
  `;
}

window.renderWorkflowDiagram = renderWorkflowDiagram;
