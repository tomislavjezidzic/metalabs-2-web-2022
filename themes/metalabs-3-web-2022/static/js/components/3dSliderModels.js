import gsap from "gsap";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ScrollTrigger from "gsap/ScrollTrigger";
import is from "is_js";

gsap.registerPlugin(ScrollTrigger);

export default class ThreeDSliderModels {
    constructor(wrapper) {
        this.DOM = {
            models: ".js-3d-slider-models",
            slide: ".js-3d-slider-slide",
        };

        this.models = wrapper.querySelector(this.DOM.models);

        // config
        this.config = {
            modelOffset: 6,
            modelScale: 1,
        };
    }

    init() {
        if (!this.models) return;

        this.modelsArray = [];

        this.modelsWrapper = new THREE.Object3D();

        this.loader = new GLTFLoader();

        // loader
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(window.dracoPath);
        dracoLoader.setDecoderConfig({
            type: "js",
        });
        this.loader.setDRACOLoader(dracoLoader);

        THREE.Cache.enabled = true;

        this.resizeModels();

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.initCamera();
        this.initScene();
        this.initLights();
        this.initRenderer();
        this.animate();
        this.mouseMove();

        this.scene.add(this.modelsWrapper);

        // handle resize
        window.addEventListener("resize", () => this.onWindowResize(), false);
    }

    resizeModels() {
        ScrollTrigger.matchMedia({
            "(min-width: 1100px)": () => {
                if (this.config.modelScale !== 0.9) {
                    this.config.modelScale = 0.9;
                }
            },
            "(max-width: 801px)": () => {
                if (this.config.modelScale !== 0.7) {
                    this.config.modelScale = 0.7;
                }
            },
            "(max-width: 600px)": () => {
                if (this.config.modelScale !== 0.6) {
                    this.config.modelScale = 0.6;
                }
            },
            "(max-width: 475px)": () => {
                if (this.config.modelScale !== 0.4) {
                    this.config.modelScale = 0.4;
                }
            },
        });
    }

    mouseMove() {
        window.addEventListener("mousemove", (ev) => {
            let mouseY = ev.clientY;

            gsap.to(this.yellowLight.position, {
                y: -1 - (mouseY - window.innerHeight) / 400,
            });

            gsap.to(this.blueLight.position, {
                y: -(mouseY - window.innerHeight) / 400,
            });
        });
    }

    /**
     * camera setup
     */
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.5, 100);
        this.camera.position.set(0, 0, 6);
        this.camera.lookAt(0, 0, 0);
    }

    /**
     * scene setup
     */
    initScene() {
        this.scene = new THREE.Scene();
    }

    /**
     * lights setup - because of performance > all in one object
     */
    initLights() {
        const lightWrapper = new THREE.Object3D();

        this.yellowLight = new THREE.PointLight(0xfeb301, 5, 4);
        this.yellowLight.position.set(-1, 1, 2);

        this.blueLight = new THREE.PointLight(0x2400ff, 5, 2);
        this.blueLight.position.set(1, 0, 1);

        lightWrapper.add(this.blueLight);
        lightWrapper.add(this.yellowLight);

        this.scene.add(lightWrapper);
    }

    /**
     * renderer setup
     */
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setPixelRatio(window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.physicallyCorrectLights = true;
        this.models.appendChild(this.renderer.domElement);
    }

    /**
     * model setup and load call
     */
    initModel(slide, index) {
        if (!slide) return;

        this.loader.load(
            slide.dataset.model,
            (gltf) => {
                gltf.scene.rotation.y = -Math.PI / 2;

                gltf.scene.position.x = index * this.config.modelOffset;

                gltf.scene.scale.set(this.config.modelScale, this.config.modelScale, this.config.modelScale);

                gltf.scene.uuid = index;

                this.modelsArray.push(gltf.scene);

                this.modelsWrapper.add(gltf.scene);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded"); /**/
            },
            (error) => {
                console.log("An error happened");
            },
        );
    }

    /**
     *
     */
    onWindowResize() {
        this.resizeModels();

        this.modelsWrapper.children.forEach((model) => model.scale.set(this.config.modelScale, this.config.modelScale, this.config.modelScale));

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * requestAnimationFrame
     */
    animate() {
        let raf = null;

        const animate = () => {
            this.renderer.render(this.scene, this.camera);
            if (this.renderer != null) {
                raf = requestAnimationFrame(animate);
            }
        };

        ScrollTrigger.create({
            trigger: this.models,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => {
                raf = requestAnimationFrame(animate);
            },
            onLeave: () => {
                cancelAnimationFrame(raf);
            },
            onEnterBack: () => {
                raf = requestAnimationFrame(animate);
            },
            onLeaveBack: () => {
                cancelAnimationFrame(raf);
            },
        });
    }

    changeSlide(index, prevIndex) {
        const model = this.modelsArray.find((model) => model.uuid === index);
        const prevModel = this.modelsArray.find((model) => model.uuid === prevIndex);

        const direction = prevIndex > index ? 1 : -1;

        gsap.timeline()
            .add("start")
            .to(
                this.modelsWrapper.position,
                {
                    x: -index * this.config.modelOffset,
                    duration: 2,
                    ease: "power4.out",
                },
                "start",
            )
            .fromTo(
                model.rotation,
                {
                    y: -Math.PI / 2 + 2.5 * direction,
                },
                {
                    y: -Math.PI / 2,
                    duration: 2,
                    ease: "power4.out",
                },
                "start",
            )
            .fromTo(
                prevModel.rotation,
                {
                    y: -Math.PI / 2,
                },
                {
                    y: -Math.PI / 2 + -2.5 * direction,
                    duration: 2,
                    ease: "power4.out",
                },
                "start",
            );
    }
}
