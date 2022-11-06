<script lang="ts" setup>
import {PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer} from "three";
import {onMounted, ref} from "vue";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {fitCameraToObject} from "../threejsUtils";

const canvas = ref<HTMLCanvasElement | null>(null);

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer();

camera.position.y = 90;
camera.position.z = 10;
camera.rotation.y = 86.40617319538832;

const loader = new GLTFLoader();
loader.load('model.gltf', function (gltf) {

  scene.add(gltf.scene);
  console.log(scene.getObjectByName("Cartello_Baked"));
  camera.position.x = fitCameraToObject(scene.getObjectByName("Cartello_Baked")!, camera.fov, camera.aspect) - 20;

}, undefined, function (error) {

  console.error(error);

});

renderer.setSize(window.innerWidth, window.innerHeight);

onMounted(() => {
  renderer.outputEncoding = sRGBEncoding;

  canvas.value?.appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
});

</script>

<template>
  <div ref="canvas"></div>
</template>

<style scoped>

</style>
