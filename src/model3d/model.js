import * as THREE from 'three';


import { Group } from './group.js';
import { Panel } from './panel.js';
import { isPanelName, isPanelPart, groupByFirstLetter } from '../stores/utils.js';

export class Model {

    constructor(model) {

        this.model = model;
        this.groups = {};
        this.groupsName = {};

        this.init();

    }
  
    init() {
        this.setGroups();
        this.setGroupsName();
    }

    panelToggleVisibility(panelName) {
        console.log("from Model Class panelToggleVisibility()",panelName)
        this.groups[panelName].toggleVisibility();
    }

    //INIT FUNCTIONS
    setGroups(){
        let currentGroupName = null;
  
        this.model.traverse((child) => {
            const name = child.name;
            // console.log(name  + "  " + isPanelName(name) + "  " + isPanelPart(name))
            let groupName = isPanelName(name)
  
            if (groupName) {
  
                currentGroupName = groupName;
                this.groups[currentGroupName] = new Panel(currentGroupName);
  
            } else if (currentGroupName && isPanelPart(name)) {
                this.allowTransprencyOnChild(child);
                // child.parent.remove(child);
                this.groups[currentGroupName].addElement(child);
            }
  
        });
    }

    allowTransprencyOnChild(child) {
        if (child.isMesh) {
            child.material.transparent = true; // Ensure transparency support
            child.material.opacity = 1; // Set initial opacity to 1
            child.userData.originalPosition = child.position.clone();
            child.material = child.material.clone();
  
            const direction = new THREE.Vector3().copy(child.position).normalize();
            child.userData.explodedPosition = child.position.clone().add(direction.multiplyScalar(4));
        }
    }

    setGroupsName(){
        this.groupsName = groupByFirstLetter(Object.keys(this.groups));
        console.log(this.groupsName)
    }

}