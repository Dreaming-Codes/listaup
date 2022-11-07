<script lang="ts" setup>
import {Object3D, PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer} from "three";
import {onMounted, ref} from "vue";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {fitCameraToObject} from "../threejsUtils";
import {lazyCall} from "../utils";

const canvas = ref<HTMLCanvasElement | null>(null);
let cartello: Object3D | null = null;

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer({antialias: true, powerPreference: "high-performance"});

const animationScripts: { start: number; end: number; func: () => void }[] = []

let scrollPercent = 0

animationScripts.push({
  start: 0,
  end: 40,
  func: () => {
    if (cartello) {
      camera.position.x = -lazyCall(fitCameraToObject, cartello, camera.fov, camera.aspect) + 70;
    }
  }
})

function playScrollAnimations() {
  animationScripts.forEach((a) => {
    if (scrollPercent >= a.start && scrollPercent < a.end) {
      a.func()
    }
  })
}


camera.position.y = 90;
camera.position.z = 10;
camera.rotation.y = 86.399;

const loader = new GLTFLoader();
loader.load('model.gltf', function (gltf) {
  scene.add(gltf.scene);
  cartello = scene.getObjectByName("Cartello_Baked")!;
}, undefined, function (error) {

  console.error(error);

});

renderer.setSize(window.innerWidth, window.innerHeight);

onMounted(() => {
  document.addEventListener("scroll", () => {
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                    document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100;
  })

  renderer.outputEncoding = sRGBEncoding;

  canvas.value?.appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const animate = () => {
    requestAnimationFrame(animate);
    playScrollAnimations();
    if (renderer.getPixelRatio() !== window.devicePixelRatio) {
      renderer.setPixelRatio(window.devicePixelRatio);
    }
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
