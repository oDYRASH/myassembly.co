import { Tween, Easing, Group } from '@tweenjs/tween.js';


export const TG = new Group();

export function openingAnimation(base, camera) {

  console.log("animation CAMERA")
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