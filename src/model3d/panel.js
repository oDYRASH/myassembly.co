export class Panel {
    constructor(name) {
      this.name = name;
      this.elements = []; // Array of Three.js objects
      this.visible = true;
    }
  
    getName() {
      return this.name;
    }

    addElement(el) {
      this.elements.push(el);
    }
  
    getElements() {
      return this.elements;
    }
  
    hide() {

      this.elements.forEach(el => {
        el.material.opacity = 0;
      });

      this.visible = false;

    }
  
    show() {

      this.elements.forEach(el => {
        el.material.opacity = 1;
      });

      this.visible = true;
    }

    toggleVisibility() {
      console.log("from PANEL Class, toggleVisibility()")
      this.visible ? this.hide() : this.show();
    }
}