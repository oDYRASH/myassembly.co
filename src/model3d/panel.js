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
  
    removeElement(elName) {
      this.elements = this.elements.filter(el => el.name !== elName);
    }
  
    findElement(elName) {
      return this.elements.find(el => el.name === elName);
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