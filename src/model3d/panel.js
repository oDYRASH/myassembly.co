import { opacityTransition } from './modelAnimation.js';

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
  
    hide(opacity=0) {
      this.setOpacity(opacity);
      this.visible = false;

    }
  
    show(opacity=1) {

      this.setOpacity(opacity);
      this.visible = true;

    }

    toggleVisibility() {
      console.log("from PANEL Class, toggleVisibility()")
      this.visible ? this.hide() : this.show();
    }

    setOpacity(opacity) {
      opacityTransition(this.elements, opacity);
    }

}