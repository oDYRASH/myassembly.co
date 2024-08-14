export class Group {
    constructor(name) {
      this.name = name;
      this.panels = {};
    }
  
    getName() {
      return this.name;
    }

    getPanels() {
      return this.panels;
    }

    getPanel(panelName) {
      return this.panels[panelName];
    }

    addPanel(panel) {
      this.panels[panel.getName()] = panel;
    }

    toggleVisibility() {
      for (let panel in this.panels) {
        console.log("Panel: " + panel);
        this.panels[panel].toggleVisibility();
      }
    }

    hide(opacity=0) {
      for (let panel in this.panels) {
        this.panels[panel].hide(opacity);
      }
    }

    show(opacity=1) {
      for (let panel in this.panels) {
        this.panels[panel].show(opacity);
      }
    }

  }
  