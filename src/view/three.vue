<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-11-06 14:41:02
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-06 16:29:48
 * @FilePath: \vue2-blog\src\view\three.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="webgl" style="margin-left: 100px;">

    </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default {
    data() {
        return {
        }
    },
    mounted() {
        // 搭建一个3D场景
        const scene = new THREE.Scene();
        const geometry = new THREE.BoxGeometry(100, 100, 100);
        const material = new THREE.MeshLambertMaterial({ color: 0xff0000, transparent: true, opacity: 0.5, antialias:true, });
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(i * 200, 0, j * 200);
                scene.add(mesh);
            }
        }

        // 实例化一个透视投影相机对象
        const width = 800;
        const height = 500;
        const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
        camera.position.set(800, 800, 800);
        // 相机观察目标指向Three 3D空间中某个位置
        camera.lookAt(0, 0, 0);
        // camera.lookAt(0, 10, 0);
        // camera.lookAt(mesh.position);
        // camera.position(200, 200, 200);
        // camera.position.set(200, 200, 200); 

        // 光源
        const pointLight = new THREE.PointLight(0xffffff, 1.0);
        pointLight.decay = 0.0;
        pointLight.position.set(400, 200, 400);
        // pointLight.position.set(100, 60, 50);
        // pointLight.position.set(-400, -200, -300);
        scene.add(pointLight);

        // const pointerLightHelper = new THREE.PointLightHelper(pointLight, 10);
        // scene.add(pointerLightHelper);

        // WebGL渲染器
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.render(scene, camera);
        // this.render(renderer, mesh, scene, camera);
        document.getElementById('webgl').appendChild(renderer.domElement);


        // 设置相机控件轨道控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', function () {
            renderer.render(scene, camera);
        })

        // function render() {
        //     renderer.render(scene, camera);
        //     mesh.rotateY(0.01);
        //     mesh.rotateX(0.01);
        //     requestAnimationFrame(render);
        // }
        // render();
    },
    methods: {
    }
}
</script>