import * as THREE from 'three';
import { Group } from './group.js';
import { Panel } from './panel.js';
import { isPanelName, isPanelPart, sortArrayByLastNumber, getElementGroups } from '../stores/utils.js';
import { PanelController } from './animationControler.js';


export class Model {

    constructor(model, orbitControls) {

        this.model = model;
        this.orbitControls = orbitControls;

        this.groups = {};

        this.groupsName = {};

        this.animationControler;

        this.init();
    }
  
    init() {

        this.setGroups();

        this.animationControler = new PanelController(this.groups);

    }


    //VISIBILITY FUNCTIONS
    togglePanelVisibility(panelName) {
        this.getPanel(panelName).toggleVisibility();
    }

    toggleGroupVisibility(groupName) {
        this.getGroup(groupName).toggleVisibility();
    }

    hideAll() {
        Object.keys(this.groups).forEach(groupName => {
            this.getGroup(groupName).hide();
        });
    }

    showAll() {
        Object.keys(this.groups).forEach(groupName => {
            this.getGroup(groupName).show();
        });
    }

    // ANIMATION FUNCTIONS
    stopAutorotate() {
        this.orbitControls.autoRotate = false;
    }


    // ANIMATION CONTROLER FUNCTIONS
    playBuildingAnimation() {
        this.hideAll();
        this.animationControler.showPanelsWithDelay();
        
    }

    pauseBuildingAnimation() {
        this.animationControler.pause();
    }

    resumeBuildingAnimation() {
        this.animationControler.resume();
    }

    stopBuildingAnimation() {
        this.animationControler.stop();
    }



    async showPanelsWithDelay() {
        for (const groupName of Object.keys(this.groups)) {
            const group = this.getGroup(groupName);
    
            const panelNames = Object.keys(group.getPanels());
            for (const panelName of panelNames) {
                await new Promise(resolve => setTimeout(resolve, 333));
                
                const panel = group.getPanel(panelName);
                panel.show();
            }
        }
    }

    //GET FUNCTIONS
    getGroups() {
        return this.groups;
    }

    getGroup(groupName) {
        return this.groups[groupName];
    }

    getPanel(panelName) {

        let group = this.getGroup(getElementGroups(panelName));
        return group.getPanel(panelName);
    }
    
    //INIT FUNCTIONS
    setGroups(){

        let existingGroups = [];

        let currentPanelName = null, currentGroupName = null;
  
        this.model.traverse((child) => {

            const name = child.name;

            let panelName = isPanelName(name)
  
            if (panelName) {

                currentGroupName = getElementGroups(panelName);

                currentPanelName = panelName;

                if(! existingGroups.includes(currentGroupName)){
                    this.groups[currentGroupName] = new Group(currentGroupName);
                    existingGroups.push(currentGroupName);
                }
  
                this.groups[currentGroupName].addPanel(new Panel(currentPanelName));

            } else if (currentPanelName && isPanelPart(name)) {
                this.allowTransprencyOnChild(child);
                this.groups[currentGroupName].getPanel(currentPanelName).addElement(child);
            }
  
        });

        this.setGroupsName();

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

        Object.keys(this.groups).forEach(groupName => {
            this.groupsName[groupName] = sortArrayByLastNumber(Object.keys(this.groups[groupName].getPanels()));
        });
        
    }

}