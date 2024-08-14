import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Group } from './group.js';
import { Panel } from './panel.js';
import { isPanelName, isPanelPart, sortArrayByLastNumber, getElementGroups } from '../stores/utils.js';
import { PanelController } from './animationControler.js';

export class Model {

    constructor(model, orbitControls, renderer, camera) {

        this.renderer = renderer;
        this.model = model;
        this.orbitControls = orbitControls;

        this.camera = camera;

        this.groups = {};

        this.groupsName = {};

        this.animationControler;

        this.mode = "ifc";

        this.init();
    }
  
    init() {

        this.setGroups(this.mode);

        this.animationControler = new PanelController(this.groups);

    }


    //TO EXPORT LEBELING CLASS
    addLabelToGroup(childrenArray, labelText) {
        if (childrenArray.length === 0) return;
    
        // console.log(childrenArray);
        // Calculate the geometric center of the group
        const center = new THREE.Vector3();
        const box = new THREE.Box3();
    
        childrenArray.forEach(child => {
            child.geometry.computeBoundingBox(); // Ensure bounding box is updated
            box.expandByObject(child);
        });
    
        box.getCenter(center);
        // console.log("getting center", center);
        // Create the label
        const labelDiv = document.createElement('div');
        labelDiv.innerHTML = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Panel ${labelText}</h5>
                <p class="card-text">Notes : X2 Screws each 250mm</p>
                <a href="#" class="btn btn-primary">Done !</a>
            </div>
        </div>
        
        `
        // labelDiv.className = 'label';
        // labelDiv.textContent = labelText;

        // Style the label
        // labelDiv.style.fontSize = '20px'; // Makes the text bigger
        // labelDiv.style.padding = '10px';  // Adds padding around the text
        // labelDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Adds a semi-transparent background
        // labelDiv.style.color = 'white'; // Text color
        // labelDiv.style.borderRadius = '5px'; // Rounded corners
        // labelDiv.style.border = '1px solid white'; // Border around the label

        const label = new CSS2DObject(labelDiv);
        label.position.copy(center); // Set the label at the center

        // Attach label to one of the children (or the scene)
        this.model.add(label);

        // TO hide the label
        // label.visible = false;

    }


    //VISIBILITY FUNCTIONS
    togglePanelVisibility(panelName) {
        const panel = this.getPanel(panelName);

        // this.addLabelToGroup(panel.getElements(), panelName);

        panel.toggleVisibility();
    }

    hideGroup(groupName) {
        this.getGroup(groupName).hide();
    }

    showGroup(groupName) {
        this.getGroup(groupName).show();
    }


    hideAll(opacity=0) {
        Object.keys(this.groups).forEach(groupName => {
            this.getGroup(groupName).hide(opacity);
        });
    }

    showAll(opacity=1) {
        Object.keys(this.groups).forEach(groupName => {
            this.getGroup(groupName).show(opacity);
        });
    }

    showThePanel(panelName) {
        this.hideAll(0.12);
        this.getPanel(panelName).show();
    }
    
    // ANIMATION FUNCTIONS
    stopAutorotate() {
        this.orbitControls.autoRotate = false;
    }

    startAutorotate() {
        this.orbitControls.autoRotate = true;
    }



    // ANIMATION CONTROLER FUNCTIONS
    playBuildingAnimation() {

        // start autorotate
        this.startAutorotate();

        // hide all panels
        this.hideAll();

        // play animation
        this.animationControler.showPanelsWithDelay();
        
    }

    pauseBuildingAnimation() {
        // stop autorotate
        this.stopAutorotate();
        // pause animation
        this.animationControler.pause();
    }

    resumeBuildingAnimation() {

        // start autorotate
        this.startAutorotate();

        // resume animation
        this.animationControler.resume();
    }

    stopBuildingAnimation() {

        // stop autorotate
        this.stopAutorotate();

        // stop animation
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

        let group = this.mode == "glb" ? this.getGroup("Group") : this.getGroup(getElementGroups(panelName));
        return group.getPanel(panelName);
    }
    
    //INIT FUNCTIONS
    setGroupsIfc(){

        let existingGroups = [];

        let currentPanelName = null, currentGroupName = null;
  
        this.model.traverse((child) => {

            const name = child.name;
            this.allowTransprencyOnChild(child);
            console.log(name);
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

    setGroupsGlb() {

        console.log("setting groups for", this.mode);


        this.groups["Group"] = new Group("Group");

        this.model.traverse((child) => {
            if (child.isMesh) {
                this.allowTransprencyOnChild(child);

                this.groups["Group"].addPanel(new Panel(child.name));
                this.groups["Group"].getPanel(child.name).addElement(child);
            }
        });

        this.setGroupsName();


    }

    setGroups() {
    
        if(this.mode === "ifc"){
            this.setGroupsIfc();
        }

        if(this.mode === "glb"){
            this.setGroupsGlb();
        }
    }

    allowTransprencyOnChild(child) {
        
        console.log("checkin mesh");

        if (child.isMesh) {

            console.log("setting transparency on child", child.name);

            const metalMaterial = new THREE.MeshStandardMaterial({
                color: 0xebebeb, // Grayish color
                transparent: true,
                opacity: 1
            });
        
            child.material = metalMaterial;

            child.material.transparent = true; // Ensure transparency support
            child.material.opacity = 1; // Set initial opacity to 1
            // child.userData.originalPosition = child.position.clone();
            child.material = child.material.clone();
  

            // const direction = new THREE.Vector3().copy(child.position).normalize();
            // child.userData.explodedPosition = child.position.clone().add(direction.multiplyScalar(4));
        }
    }

    setGroupsName(){

        Object.keys(this.groups).forEach(groupName => {
            this.groupsName[groupName] = sortArrayByLastNumber(Object.keys(this.groups[groupName].getPanels()));
        });
        
    }

}