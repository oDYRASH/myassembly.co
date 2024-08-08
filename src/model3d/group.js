export class Group {
    constructor(name) {
      this.name = name;
      this.panels = [];
    }
  
    addPanel(panel) {
      this.panels.push(panel);
    }
  
    removePanel(panelName) {
      this.panels = this.panels.filter(panel => panel.name !== panelName);
    }
  
    findPanel(panelName) {
      return this.panels.find(panel => panel.name === panelName);
    }
  }
  