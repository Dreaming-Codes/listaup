<script lang="ts" setup>
import {AnimationClip, AnimationMixer, Camera, PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer} from "three";
import {onMounted, ref} from "vue";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {useAnimStateStore} from "../stores/animState";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";

const canvas = ref<HTMLCanvasElement | null>(null);

//Three.js scene
const scene = new Scene();

//Three.js renderer
const renderer = new WebGLRenderer({antialias: true, powerPreference: "high-performance"});
//Render in sRGB color space
renderer.outputEncoding = sRGBEncoding;
//Setting render size
renderer.setSize(window.innerWidth, window.innerHeight);

//Three.js camera
let camera: PerspectiveCamera;

//animState store to share scroll animation state between components
const animState = useAnimStateStore();

let animMixer: AnimationMixer;

//Animation loop
function animate() {
  //Tell webgl to call animate again on the next frame
  requestAnimationFrame(animate);

  //If the actual pixel ratio is different from the one used to render the scene, update pixel ratio
  if (renderer.getPixelRatio() !== window.devicePixelRatio) {
    renderer.setPixelRatio(window.devicePixelRatio);
  }

  //animMixer.setTime(10)
  //animMixer.update(-0.01);

  //Render the scene
  renderer.render(scene, camera);
}

//Dracoloader to load compressed gltf files
const dracoLoader = new DRACOLoader();
//Using decoder from the latest GitHub commit
//TODO: Use a local copy of the decoder
dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/');

//GLTF loader
const loader = new GLTFLoader();
//Set the draco loader as the decoder for the GLTF loader
loader.setDRACOLoader(dracoLoader);



loader.load('scene.gltf', (gltf) => {
  //Add the loaded model to the scene
  scene.add(gltf.scene);

  //Add the animations to the animation mixer
  animMixer = new AnimationMixer( gltf.scene );
  animMixer.timeScale = 0.416;

  //Play all the animations of the model
  gltf.animations.forEach((clip) => {
    animMixer.clipAction(clip).play();
  })

  //Get the camera from the loaded model
  camera = gltf.cameras.find(c => c.name === "ThreeCamera") as PerspectiveCamera;
  //Fit the camera to the screen
  camera.aspect = window.innerWidth / window.innerHeight;
  //Update the camera projection matrix
  camera.updateProjectionMatrix();
  animate();
  animState.isLoading = false;

}, undefined, (error) => {
  animState.errorState = error;
  console.error(error);
});


onMounted(() => {
  document.addEventListener("scroll", () => {
    animState.scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                    document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100;

    //Setting animation time to the scroll percent
    animMixer.setTime(animState.scrollPercent);
  })

  canvas.value?.appendChild(renderer.domElement);

  //On window resize, update the camera aspect and renderer size
  window.addEventListener("resize", () => {
    //Check if the camera is defined since it is not defined until the model is loaded
    if (camera) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});

</script>

<template>
  <div ref="canvas"></div>
</template>

<style scoped>

</style>
