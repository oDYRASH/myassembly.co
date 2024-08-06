import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Tween, Easing, Group } from '@tweenjs/tween.js';
import modelPath from '@/assets/glbModel/HomePageModel.glb'; // Ensure this path is correct

export function initThreeJs () {
    const base = { x: 0, y: 4, z: 14 };
    const TG = new Group();

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(base.x, base.y, base.z);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });//, canvas: document.getElementById('model3dHome') 
    renderer.useLegacyLights =  false;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0); // Set background color to white
    document.body.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, .5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
    dirLight.position.set( 10, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 4;
    dirLight.shadow.camera.bottom = - 4;
    dirLight.shadow.camera.left = - 4;
    dirLight.shadow.camera.right = 4;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add( dirLight );


    // Orbit Controls
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true; // Enable damping (inertia)
    // controls.dampingFactor = 0.25; // Damping inertia factor
    // controls.screenSpacePanning = false; // Do not allow panning
    // controls.minDistance = 5; // Set minimum zoom distance
    // controls.maxDistance = 50; // Set maximum zoom distance
    // controls.maxPolarAngle = Math.PI / 2; // Limit the vertical rotation
    // controls.enableZoom = false; // Disable zooming by scrolling

    let exploded = false;   

    // GLTF Loader
    var model;
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
        model = gltf.scene;
        model.name = 'modelHomeView';
        scene.add(model);
        
        model.traverse((child) => {
            if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 1;
            child.userData.originalPosition = child.position.clone();
            child.material = child.material.clone();
            const direction = new THREE.Vector3().copy(child.position).normalize();
            child.userData.explodedPosition = child.position.clone().add(direction.multiplyScalar(4));
            }
        });

    }, undefined, (error) => {
    console.error(error);
    });


    // Rotate model
    // .onComplete(() => {
    //     const modelObj = scene.getObjectByName('modelHomeView');
    //     let t3 = new Tween(modelObj.rotation)
    //         .to({ x: .25 }, 2222)
    //         .easing(Easing.Cubic.InOut)
    //         .start();
    //     TG.add(t3);
    // });


    document.addEventListener("DOMContentLoaded", () => {

        let t1 = new Tween(camera.position)
            .to({ y: 8, z: 0 }, 25)
            .easing(Easing.Cubic.InOut)
            .start()
            

        TG.add(t1);

            setTimeout(() => {
                let t2 = new Tween(camera.position)
                    .to(base, 2200)
                    .easing(Easing.Cubic.InOut)
                    .start()


                TG.add(t2);
            }, 50);

           

        });



    /////////////////////////
    /////////////////////////
    /////////////////////////

    // Function to toggle explode
    function toggleExplode(reverse = false) {
        if (!model) return;

        model.traverse((child) => {
            if (child.isMesh) {// && child.isGroup
                if (child.userData.originalPosition && child.userData.explodedPosition) {
                    const startPosition = { x: child.position.x, y: child.position.y, z: child.position.z };
                    const targetPosition = reverse ? child.userData.originalPosition : child.userData.explodedPosition;

                    new Tween(startPosition)
                        .to({ x: targetPosition.x, y: targetPosition.y, z: targetPosition.z }, 1000)
                        .easing(Easing.Exponential.InOut)
                        .onUpdate(() => {
                            child.position.set(startPosition.x, startPosition.y, startPosition.z);
                        })
                        .start();
                } else {
                    console.warn('Missing userData properties for:', child);
                }
            }
        });
        exploded = !exploded;
    }

    let spinModel = false;

    function resetSpin() {
        new Tween(model.rotation)
            .to({ y: 0 }, 1000)
            .easing(Easing.Cubic.InOut)
            .start();
    }

    let groups = {'IfcElementAssembly1F-4': ['IfcBeam150S-51-16-1001', 'IfcBeam150S-51-16-1002', 'IfcBeam150S-51-16-1003', 'IfcBeam150S-51-16-1007', 'IfcBeam150S-51-16-1009', 'IfcBeam150S-51-16-1010', 'IfcBeam150S-51-16-1012'], 'IfcElementAssembly1F-5': ['IfcBeam150S-51-16-15', 'IfcBeam150S-51-16-1004', 'IfcBeam150S-51-16-1006', 'IfcBeam150S-51-16-1008', 'IfcBeam150S-51-16-1011'], 'IfcElementAssemblyG-W13': ['IfcColumn89S-51-16-1069', 'IfcColumn89S-51-16-1070', 'IfcColumn89S-51-16-1071', 'IfcBeam89S-51-16-1038', 'IfcColumn89S-51-16-1072', 'IfcBeam89S-51-16-1039', 'IfcBeam89S-51-16-1040'], 'IfcElementAssemblyG-W12': ['IfcColumn89S-51-16-1073', 'IfcColumn89S-51-16-1074', 'IfcColumn89S-51-16-1075', 'IfcColumn89S-51-16-1076', 'IfcColumn89S-51-16-1077', 'IfcColumn89S-51-16-1078', 'IfcBeam89S-51-16-1041', 'IfcBeam89S-51-16-1043', 'IfcBeam89S-51-16-1045'], 'IfcElementAssemblyG-W2': ['IfcColumn89S-51-16-1079', 'IfcBeam89S-51-16-1042', 'IfcBeam89S-51-16-1044', 'IfcColumn89S-51-16-1080', 'IfcColumn89S-51-16-1081', 'IfcColumn89S-51-16-1082', 'IfcColumn89S-51-16-1083', 'IfcColumn89S-51-16-1084', 'IfcColumn89S-51-16-1086', 'IfcBeam89S-51-16-1048', 'IfcBeam89S-51-16-1050', 'IfcBeam89S-51-16-1051'], 'IfcElementAssemblyG-W10': ['IfcColumn89S-51-16-1085', 'IfcBeam89S-51-16-1046', 'IfcBeam89S-51-16-1047', 'IfcColumn89S-51-16-1087', 'IfcColumn89S-51-16-1088', 'IfcBeam89S-51-16-1049', 'IfcColumn89S-51-16-1089', 'IfcColumn89S-51-16-1090', 'IfcColumn89S-51-16-1091', 'IfcBeam89S-51-16-1053', 'IfcBeam89S-51-16-1054'], 'IfcElementAssemblyG-W9': ['IfcColumn89S-51-16-1092', 'IfcBeam89S-51-16-1052', 'IfcColumn89S-51-16-1093', 'IfcColumn89S-51-16-1094', 'IfcColumn89S-51-16-1095', 'IfcBeam89S-51-16-1055', 'IfcColumn89S-51-16-1096', 'IfcBeam89S-51-16-1057', 'IfcColumn89S-51-16-1097', 'IfcColumn89S-51-16-1098', 'IfcBeam89S-51-16-1058', 'IfcColumn89S-51-16-1099', 'IfcBeam89S-51-16-1059', 'IfcBeam89S-51-16-1061', 'IfcBeam89S-51-16-1064'], 'IfcElementAssemblyG-W11': ['IfcBeam89S-51-16-1056', 'IfcColumn89S-51-16-1100', 'IfcColumn89S-51-16-1101', 'IfcColumn89S-51-16-1102', 'IfcColumn89S-51-16-1103', 'IfcBeam89S-51-16-1060', 'IfcColumn89S-51-16-1104', 'IfcColumn89S-51-16-1105', 'IfcColumn89S-51-16-1106', 'IfcColumn89S-51-16-1107', 'IfcBeam89S-51-16-1062', 'IfcColumn89S-51-16-1108', 'IfcBeam89S-51-16-1063', 'IfcBeam89S-51-16-1065', 'IfcBeam89S-51-16-1068'], 'IfcElementAssemblyG-W3': ['IfcColumn89S-51-16-1109', 'IfcColumn89S-51-16-1110', 'IfcColumn89S-51-16-1111', 'IfcColumn89S-51-16-1112', 'IfcColumn89S-51-16-1113', 'IfcColumn89S-51-16-1114', 'IfcBeam89S-51-16-1067', 'IfcColumn89S-51-16-1115', 'IfcColumn89S-51-16-1116', 'IfcColumn89S-51-16-1117', 'IfcBeam89S-51-16-1070', 'IfcBeam89S-51-16-1072', 'IfcBeam89S-51-16-1073'], 'IfcElementAssemblyG-W4': ['IfcBeam89S-51-16-1066', 'IfcColumn89S-51-16-1118', 'IfcBeam89S-51-16-1069', 'IfcColumn89S-51-16-1119', 'IfcBeam89S-51-16-1071', 'IfcColumn89S-51-16-1120', 'IfcColumn89S-51-16-1121', 'IfcColumn89S-51-16-1122', 'IfcColumn89S-51-16-1123', 'IfcColumn89S-51-16-1124', 'IfcColumn89S-51-16-1125', 'IfcColumn89S-51-16-1126', 'IfcColumn89S-51-16-1127', 'IfcColumn89S-51-16-1128', 'IfcBeam89S-51-16-1076', 'IfcBeam89S-51-16-1078', 'IfcBeam89S-51-16-1080'], 'IfcElementAssemblyG-W1': ['IfcBeam89S-51-16-1074', 'IfcBeam89S-51-16-1075', 'IfcColumn89S-51-16-1129', 'IfcColumn89S-51-16-1130', 'IfcColumn89S-51-16-1131', 'IfcColumn89S-51-16-1132', 'IfcColumn89S-51-16-1133', 'IfcBeam89S-51-16-1077', 'IfcBeam89S-51-16-1079', 'IfcColumn89S-51-16-1134', 'IfcColumn89S-51-16-1135', 'IfcColumn89S-51-16-1136', 'IfcColumn89S-51-16-1137', 'IfcBeam89S-51-16-1081', 'IfcBeam89S-51-16-1083', 'IfcBeam89S-51-16-1085', 'IfcColumn89S-51-16-1142', 'IfcBeam89S-51-16-1087', 'IfcColumn89S-51-16-1147'], 'IfcElementAssemblyG-W6': ['IfcBeam89S-51-16-1082', 'IfcColumn89S-51-16-1138', 'IfcBeam89S-51-16-1084', 'IfcColumn89S-51-16-1139', 'IfcColumn89S-51-16-1140', 'IfcColumn89S-51-16-1141', 'IfcColumn89S-51-16-1143', 'IfcBeam89S-51-16-1086', 'IfcColumn89S-51-16-1144', 'IfcColumn89S-51-16-1145', 'IfcBeam89S-51-16-1088', 'IfcBeam89S-51-16-1089', 'IfcColumn89S-51-16-1146', 'IfcBeam89S-51-16-1091'], 'IfcElementAssemblyG-W5': ['IfcColumn89S-51-16-1148', 'IfcBeam89S-51-16-1090', 'IfcColumn89S-51-16-1149', 'IfcBeam89S-51-16-1092', 'IfcColumn89S-51-16-1150', 'IfcColumn89S-51-16-1151', 'IfcColumn89S-51-16-1152', 'IfcColumn89S-51-16-1153', 'IfcColumn89S-51-16-1154', 'IfcColumn89S-51-16-1155', 'IfcBeam89S-51-16-1093', 'IfcColumn89S-51-16-1156', 'IfcBeam89S-51-16-1094', 'IfcColumn89S-51-16-1157', 'IfcBeam89S-51-16-1095', 'IfcColumn89S-51-16-1158', 'IfcBeam89S-51-16-1096', 'IfcBeam89S-51-16-1099'], 'IfcElementAssemblyG-W7': ['IfcColumn89S-51-16-1159', 'IfcColumn89S-51-16-1160', 'IfcColumn89S-51-16-1161', 'IfcColumn89S-51-16-1162', 'IfcColumn89S-51-16-1163', 'IfcColumn89S-51-16-1164', 'IfcBeam89S-51-16-1097', 'IfcBeam89S-51-16-1098', 'IfcColumn89S-51-16-1165', 'IfcBeam89S-51-16-1100'], 'IfcElementAssemblyG-W8': ['IfcColumn89S-51-16-1166', 'IfcColumn89S-51-16-1167', 'IfcColumn89S-51-16-1168', 'IfcBeam89S-51-16-1101', 'IfcColumn89S-51-16-1169', 'IfcColumn89S-51-16-1170', 'IfcBeam89S-51-16-1102', 'IfcColumn89S-51-16-1171', 'IfcBeam89S-51-16-1103', 'IfcColumn89S-51-16-1172', 'IfcColumn89S-51-16-1173', 'IfcColumn89S-51-16-1174', 'IfcBeam89S-51-16-1104', 'IfcColumn89S-51-16-1175', 'IfcBeam89S-51-16-1105'], 'IfcElementAssembly1F-2': ['IfcBeam150S-51-16-1054', 'IfcBeam150S-51-16-1057', 'IfcBeam150S-51-16-1058', 'IfcBeam150S-51-16-1059', 'IfcBeam150S-51-16-1060', 'IfcBeam150S-51-16-1063', 'IfcBeam150S-51-16-1064', 'IfcBeam150S-51-16-1067', 'IfcBeam150S-51-16-1074'], 'IfcElementAssembly1F-3': ['IfcBeam150S-51-16-1061', 'IfcBeam150S-51-16-1065', 'IfcBeam150S-51-16-1066', 'IfcBeam150S-51-16-1068', 'IfcBeam150S-51-16-1070', 'IfcBeam150S-51-16-1071', 'IfcBeam150S-51-16-1075'], 'IfcElementAssembly1F-1': ['IfcBeam150S-51-16-1069', 'IfcBeam150S-51-16-1072', 'IfcBeam150S-51-16-1073', 'IfcBeam150S-51-16-1078', 'IfcBeam150S-51-16-1081', 'IfcBeam150S-51-16-1082', 'IfcBeam150S-51-16-1086'], 'IfcElementAssemblyR1': ['IfcBeam150S-51-16-1076', 'IfcBeam150S-51-16-1077', 'IfcBeam150S-51-16-1079', 'IfcBeam150S-51-16-1080', 'IfcBeam150S-51-16-1083', 'IfcBeam150S-51-16-1084', 'IfcBeam150S-51-16-1085', 'IfcBeam150S-51-16-1087', 'IfcBeam150S-51-16-1088', 'IfcBeam150S-51-16-1089', 'IfcBeam150S-51-16-1110'], 'IfcElementAssemblyR2': ['IfcBeam150S-51-16-1090', 'IfcBeam150S-51-16-1091', 'IfcBeam150S-51-16-1092', 'IfcBeam150S-51-16-1093', 'IfcBeam150S-51-16-1094', 'IfcBeam150S-51-16-1096', 'IfcBeam150S-51-16-1097', 'IfcBeam150S-51-16-1098', 'IfcBeam150S-51-16-1100', 'IfcBeam150S-51-16-1108', 'IfcBeam150S-51-16-1109'], 'IfcElementAssemblyR3': ['IfcBeam150S-51-16-1095', 'IfcBeam150S-51-16-1099', 'IfcBeam150S-51-16-1101', 'IfcBeam150S-51-16-1102', 'IfcBeam150S-51-16-1103', 'IfcBeam150S-51-16-1104', 'IfcBeam150S-51-16-1105', 'IfcBeam150S-51-16-1106', 'IfcBeam150S-51-16-1107'], 'IfcElementAssembly1F-W5': ['IfcColumn89S-51-16-12', 'IfcColumn89S-51-16-1001', 'IfcColumn89S-51-16-1003', 'IfcColumn89S-51-16-1004', 'IfcColumn89S-51-16-1005', 'IfcColumn89S-51-16-1006', 'IfcColumn89S-51-16-1007', 'IfcBeam89S-51-16-12', 'IfcColumn89S-51-16-1008', 'IfcBeam89S-51-16-1001', 'IfcBeam89S-51-16-1003', 'IfcBeam89S-51-16-1004'], 'IfcElementAssembly1F-W4': ['IfcColumn89S-51-16-1009', 'IfcColumn89S-51-16-1010', 'IfcColumn89S-51-16-1011', 'IfcColumn89S-51-16-1012', 'IfcColumn89S-51-16-1013', 'IfcColumn89S-51-16-1014', 'IfcColumn89S-51-16-1015', 'IfcColumn89S-51-16-1018', 'IfcBeam89S-51-16-1005', 'IfcBeam89S-51-16-1008', 'IfcBeam89S-51-16-1011', 'IfcBeam89S-51-16-1012'], 'IfcElementAssembly1F-W1': ['IfcColumn89S-51-16-1016', 'IfcColumn89S-51-16-1017', 'IfcBeam89S-51-16-1006', 'IfcBeam89S-51-16-1007', 'IfcColumn89S-51-16-1019', 'IfcColumn89S-51-16-1020', 'IfcColumn89S-51-16-1021', 'IfcBeam89S-51-16-1009', 'IfcColumn89S-51-16-1022', 'IfcColumn89S-51-16-1023', 'IfcBeam89S-51-16-1010', 'IfcColumn89S-51-16-1024', 'IfcColumn89S-51-16-1025', 'IfcBeam89S-51-16-1013', 'IfcColumn89S-51-16-1026', 'IfcColumn89S-51-16-1027', 'IfcBeam89S-51-16-1014', 'IfcBeam89S-51-16-1015', 'IfcColumn89S-51-16-1030', 'IfcBeam89S-51-16-1018', 'IfcBeam89S-51-16-1020'], 'IfcElementAssembly1F-W2': ['IfcBeam89S-51-16-1016', 'IfcColumn89S-51-16-1028', 'IfcBeam89S-51-16-1017', 'IfcColumn89S-51-16-1029', 'IfcColumn89S-51-16-1031', 'IfcBeam89S-51-16-1019', 'IfcColumn89S-51-16-1032', 'IfcColumn89S-51-16-1033', 'IfcColumn89S-51-16-1034', 'IfcColumn89S-51-16-1035', 'IfcColumn89S-51-16-1036', 'IfcColumn89S-51-16-1037', 'IfcColumn89S-51-16-1038', 'IfcColumn89S-51-16-1039', 'IfcBeam89S-51-16-1021', 'IfcBeam89S-51-16-1022', 'IfcBeam89S-51-16-1023', 'IfcBeam89S-51-16-1027'], 'IfcElementAssembly1F-W7': ['IfcColumn89S-51-16-1040', 'IfcColumn89S-51-16-1041', 'IfcColumn89S-51-16-1042', 'IfcColumn89S-51-16-1043', 'IfcColumn89S-51-16-1045', 'IfcColumn89S-51-16-1046', 'IfcBeam89S-51-16-1024', 'IfcBeam89S-51-16-1025', 'IfcBeam89S-51-16-1026'], 'IfcElementAssembly1F-W3': ['IfcColumn89S-51-16-1044', 'IfcColumn89S-51-16-1047', 'IfcColumn89S-51-16-1048', 'IfcColumn89S-51-16-1049', 'IfcColumn89S-51-16-1050', 'IfcColumn89S-51-16-1051', 'IfcColumn89S-51-16-1052', 'IfcColumn89S-51-16-1053', 'IfcColumn89S-51-16-1055', 'IfcBeam89S-51-16-1028', 'IfcBeam89S-51-16-1031', 'IfcBeam89S-51-16-1033'], 'IfcElementAssembly1F-W6': ['IfcColumn89S-51-16-1054', 'IfcColumn89S-51-16-1056', 'IfcColumn89S-51-16-1057', 'IfcColumn89S-51-16-1058', 'IfcColumn89S-51-16-1059', 'IfcColumn89S-51-16-1060', 'IfcColumn89S-51-16-1061', 'IfcColumn89S-51-16-1063', 'IfcBeam89S-51-16-1029', 'IfcBeam89S-51-16-1036', 'IfcBeam89S-51-16-1037'], 'IfcElementAssembly1F-W8': ['IfcColumn89S-51-16-1062', 'IfcColumn89S-51-16-1064', 'IfcColumn89S-51-16-1065', 'IfcColumn89S-51-16-1066', 'IfcBeam89S-51-16-1030', 'IfcBeam89S-51-16-1032', 'IfcBeam89S-51-16-1034', 'IfcBeam89S-51-16-1035', 'IfcColumn89S-51-16-1067', 'IfcColumn89S-51-16-1068'], 'IfcElementAssemblyR7': ['IfcBeam150S-51-16-1013', 'IfcBeam150S-51-16-1014', 'IfcBeam150S-51-16-1015', 'IfcBeam150S-51-16-1017', 'IfcBeam150S-51-16-1018', 'IfcBeam150S-51-16-1020', 'IfcBeam150S-51-16-1021', 'IfcBeam150S-51-16-1023', 'IfcBeam150S-51-16-1025', 'IfcBeam150S-51-16-1026', 'IfcBeam150S-51-16-1035'], 'IfcElementAssemblyR6': ['IfcBeam150S-51-16-1016', 'IfcBeam150S-51-16-1019', 'IfcBeam150S-51-16-1022', 'IfcBeam150S-51-16-1024', 'IfcBeam150S-51-16-1027', 'IfcBeam150S-51-16-1030', 'IfcBeam150S-51-16-1044'], 'IfcElementAssemblyR5': ['IfcBeam150S-51-16-1028', 'IfcBeam150S-51-16-1029', 'IfcBeam150S-51-16-1031', 'IfcBeam150S-51-16-1033', 'IfcBeam150S-51-16-1034', 'IfcBeam150S-51-16-1036', 'IfcBeam150S-51-16-1037', 'IfcBeam150S-51-16-1038', 'IfcBeam150S-51-16-1041', 'IfcBeam150S-51-16-1055'], 'IfcElementAssemblyR8': ['IfcBeam150S-51-16-1032', 'IfcBeam150S-51-16-1039', 'IfcBeam150S-51-16-1040', 'IfcBeam150S-51-16-1042', 'IfcBeam150S-51-16-1043', 'IfcBeam150S-51-16-1047', 'IfcBeam150S-51-16-1048'], 'IfcElementAssemblyR4': ['IfcBeam150S-51-16-1045', 'IfcBeam150S-51-16-1046', 'IfcBeam150S-51-16-1049', 'IfcBeam150S-51-16-1050', 'IfcBeam150S-51-16-1051', 'IfcBeam150S-51-16-1052', 'IfcBeam150S-51-16-1053', 'IfcBeam150S-51-16-1056', 'IfcBeam150S-51-16-1062']}


    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });


    function showAllGroups(){
        model.traverse((child) => {
            if (child.isMesh) {
                new Tween(child.material)
                    .to({ opacity: 1 }, 300)
                    .easing(Easing.Cubic.InOut)
                    .onUpdate(() => {
                        child.visible = child.material.opacity > 0;
                    })
                    .start();
            }
        });
    }

    function hideAllGroups(animationDelay=100){

        model.traverse((child) => {
            if (child.isMesh) {

                new Tween(child.material)
                    .to({ opacity: 0.00 }, animationDelay)
                    .easing(Easing.Cubic.InOut)
                    .onUpdate(() => {
                        child.visible = child.material.opacity > 0;
                    })
                    .start();
            }
        });
    }

    function containsNumber(s, numbers) {
        return numbers.some(number => s.includes(number));
    }

    // Function to smoothly hide all groups except the specified one
    function showGroup(toShow) {
        // console.log("toShow : ", toShow)
        if (!model) return;
        model.traverse((child) => {
        if (child.isMesh) {

            if ( containsNumber(child.name, toShow) ) {
                new Tween(child.material)
                    .to({ opacity: 1 }, 300)
                    .easing(Easing.Cubic.InOut)
                    .onUpdate(() => {
                        child.visible = child.material.opacity > 0;
                    })
                    .start();
                }
            }
        });

    }


/////////////////////////
/////////////////////////
/////////////////////////

// Animation loop
const animate = () => {

    requestAnimationFrame(animate);
    
    TG.update(); 

    renderer.render(scene, camera);

};

animate();

};



// import * as THREE from 'three';
// import { GLTFLoader } from 'GLTFLoader';
// import { OrbitControls } from 'OrbitControls';
// import { Tween, Easing, update } from 'TWEEN';

// import { isPanelName, isPanelPart } from "./utils.js"

// export class SceneHandler {

//     constructor(cameraPosition = { x: 0, y: 5, z: 14 }, clearColor = 0xffffff, ambientLightIntensity = 0.5, pointLightIntensity = 1) {
      
//       this.name = "TEST_001"
//       this.cameraPosition = cameraPosition;
//       this.clearColor = clearColor;
//       this.ambientLightIntensity = ambientLightIntensity;
//       this.pointLightIntensity = pointLightIntensity;
//       this.scene = new THREE.Scene();
//       this.loader = new GLTFLoader();

//       this.raycaster = new THREE.Raycaster();
//       this.mouse = new THREE.Vector2();


//       //specific to each model
//       this.model = null;
//       this.groups = {}

//       window.addEventListener('resize', this.onWindowResize.bind(this), false);

//       this.initScene()
//     }
  
//     initScene() {
//       this.initCamera();
//       console.log('camera initialized')
//       this.initRenderer();
//       console.log('renderer initialized')
//       this.initLights();
//       console.log('lights initialized')
//       this.initControls();
//       console.log('controls initialized')
//       this.animate();
//       console.log('animate initialized')
//       this.setupNamingOnClick();
//       console.log('naming initialized')
//     }
  
    

//     getGroupsArray(){
//       return this.groups
//     }

//     initCamera() {
//       this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
//       this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
//       this.camera.lookAt(new THREE.Vector3(0, 0, 0));
//     }
  
//     initRenderer() {

//       const canvasObject = document.getElementById('main3dModelScene');

//       this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasObject });
//       this.renderer.setSize(window.innerWidth * 0.618, window.innerHeight);
//       this.renderer.setClearColor(this.clearColor, 0); // Set background color
//       canvasObject.__threeRenderer = this.renderer;
//       // document.body.appendChild(this.renderer.domElement);
//     }
  
//     initLights() {
//       this.ambientLight = new THREE.AmbientLight(0xffffff, this.ambientLightIntensity);
//       this.scene.add(this.ambientLight);
  
//       this.pointLight = new THREE.PointLight(0xffffff, this.pointLightIntensity, 100);
//       this.pointLight.position.set(10, 10, 10);
//       this.scene.add(this.pointLight);
//     }
  
//     initControls() {
//       this.controls = new OrbitControls(this.camera, this.renderer.domElement);
//       this.controls.enableDamping = true;
//       this.controls.dampingFactor = 0.25;
//       this.controls.screenSpacePanning = false;
//       this.controls.minDistance = 5;
//       this.controls.maxDistance = 50;
//       this.controls.maxPolarAngle = Math.PI / 2;
//       this.controls.enableZoom = true;
//     }
  
//     onWindowResize() {
//       this.camera.aspect = window.innerWidth / window.innerHeight;
//       this.camera.updateProjectionMatrix();
//       this.renderer.setSize(window.innerWidth * 0.618, window.innerHeight);
//     }
  
//     loadModel(fileName) {
//       if (this.model) {
//         this.scene.remove(this.model.parent);
//         this.model = null;
//       }

//       this.loader.load(fileName + '.glb', (gltf) => {

//         this.model = gltf.scene;
  
//         const pivot = new THREE.Object3D();
//         this.scene.add(pivot);
//         pivot.add(this.model);
        
//         const box = new THREE.Box3().setFromObject(this.model);
//         const center = box.getCenter(new THREE.Vector3());
//         this.model.position.set(-center.x, -center.y, -center.z);
  
//         this.pivot = pivot;

//         this.setupCameraForModel()
//         this.generateUi()
//       }, undefined, (error) => {
//         console.error(error);
//       });
//     }
  
//     makeSpin() {
//       if (!this.model) {
//         alert('No model loaded');
//         return;
//       }
    
//       if (this.pivot) {
//         new Tween(this.pivot.rotation)
//           .to({ y: this.pivot.rotation.y + Math.PI * 2 }, 1500)
//           .start();
//       }
//     }

//     setupCameraForModel() {

//       if(!this.model) {
//         alert('No model loaded');
//       }

//       console.log('model loaded')
//       const box = new THREE.Box3().setFromObject(this.model);
//       const center = box.getCenter(new THREE.Vector3());
  
//       this.camera.position.set(center.x, center.y + 5, center.z + 14);
//       this.camera.lookAt(center);
  
//       this.controls.target.set(center.x, center.y, center.z);
//     }
  
//     setupCameraForGroup(childrenArray) {

//       if (!this.model) {
//         alert('No model loaded');
//         return;
//       }
    
//       if (!childrenArray || childrenArray.length === 0) {
//         console.warn('No children provided');
//         return;
//       }
    
//       // Create a temporary parent to hold the children
//       const tempParent = new THREE.Group();
//       childrenArray.forEach(child => tempParent.add(child));
    
//       // Calculate bounding box and center for the group
//       const box = new THREE.Box3().setFromObject(tempParent);
//       const center = box.getCenter(new THREE.Vector3());
    
//       // Set camera position and lookAt
//       this.camera.position.set(center.x, center.y + 5, center.z + 14);
//       this.camera.lookAt(center);
    
//       // Update orbit controls target (optional)
//       if (this.controls) {
//         this.controls.target.set(center.x, center.y, center.z);
//       }
//     }
    

//     setupNamingOnClick() {

//       // Add event listener for mousedown
//       // window.addEventListener('mousedown', this.onMouseDown, false);
//       return

//     }

//   //   onMouseDown(event) {
//   //     // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
//   //     this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   //     this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   //     // Update the raycaster with the camera and mouse position
//   //     this.raycaster.setFromCamera(this.mouse, camera);

//   //     // Calculate objects intersecting the raycaster
//   //     const intersects = this.raycaster.intersectObjects(scene.children, true);

//   //     if (intersects.length > 0) {
//   //         console.log('Clicked piece name:', intersects[0].object.name);
//   //     }
//   // }

//     animate() {
//       requestAnimationFrame(this.animate.bind(this));
//       this.controls.update();
//       this.renderer.render(this.scene, this.camera);
//       update(); // Update tweens
      
//     }

//     allowTransprencyOnChild(child){
//       if (child.isMesh) {
//           child.material.transparent = true; // Ensure transparency support
//           child.material.opacity = 1; // Set initial opacity to 1
//           child.userData.originalPosition = child.position.clone();
//           child.material = child.material.clone();

//           const direction = new THREE.Vector3().copy(child.position).normalize();
//           child.userData.explodedPosition = child.position.clone().add(direction.multiplyScalar(4));
//       }
//     }

//     generateUi(){
//       this.setGroups()
//       this.UIM.generateUi(this.groups, this)
//     }

//     setGroups() {
//       console.log("start setGroups")
//       let currentGroupName = null;
  
//       this.model.traverse((child) => {
//           const name = child.name;
//           // console.log(name  + "  " + isPanelName(name) + "  " + isPanelPart(name))
//           let groupName = isPanelName(name)

//           if (groupName) {

//               currentGroupName = groupName;
//               this.groups[currentGroupName] = [];

//           } else if (currentGroupName && isPanelPart(name)) {
//               this.allowTransprencyOnChild(child);
//               // child.parent.remove(child);
//               this.groups[currentGroupName].push(child);
//           }

//       });

//       console.log("Groups set")
//     }

//     hideAllGroups() {
//       this.model.traverse((child) => {
//         if (child.isMesh) {

//             new Tween(child.material)
//                 .to({ opacity: 0.15 }, 300)
//                 .easing(Easing.Cubic.InOut)
//                 .start();
//         }
//     });
//     }

//     toogleGroupVisibility(groupName) {

//       this.hideAllGroups();
    
//       setTimeout(() => {

//         // this.setupCameraForGroup(this.groups[groupName]);

//         this.groups[groupName].forEach((child) => {
//           new Tween(child.material)
//               .to({ opacity: 1.00 }, 150)
//               .easing(Easing.Cubic.InOut)
//               .start();
  
//         });

//       }, 301);

      

//     }
    

// }