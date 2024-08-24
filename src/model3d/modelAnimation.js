import { Tween, Easing, Group } from '@tweenjs/tween.js';


export const TG = new Group();

export function openingAnimation(base, camera) {

  console.log("animation CAMERA")
  let t1 = new Tween(camera.position)
    .to({ x: 0, y: 8, z: 0 }, 25)
    .easing(Easing.Cubic.InOut)
    .start()


  TG.add(t1);

    setTimeout(() => {
        let t2 = new Tween(camera.position)
            .to(base, 1500)
            .easing(Easing.Cubic.InOut)
            .start()


        TG.add(t2);
    }, 50);

}

// funciton that animate opacity of the panel
export function opacityTransition(panel, opacity, duration=300) {

  panel.forEach(el => {
    TG.add (
      new Tween(el.material)
        .to({ opacity: opacity }, duration)
        .easing(Easing.Quadratic.Out)
        .start()
    )
  });
}

export function resetModelSpin(model) {
  new Tween(model.rotation)
      .to({ y: 0 }, 1000)
      .easing(Easing.Cubic.InOut)
      .start();
}


export function stepHome(model3D, camera) {
  console.log("stepHome");
  model3D.showAll();
  model3D.stopBuildingAnimation();
}

export function step0(model3D, camera) {
  model3D.playBuildingAnimation();
  // model3D.stopShowSomePlanelAnimation();
}

export function step1(model3D) {

  model3D.allowShowSomePlanelAnimation();
  model3D.stopBuildingAnimation();
  resetModelSpin(model3D.model);
  model3D.showSomeWallsAnimation();  
}

export function step2(model3D, camera) {
}

export function step3(model3D, camera) {

}

export function step4(model3D, camera) {

  
}