import React, { useEffect, useRef } from "react";
import { useGLTF, PerspectiveCamera, OrbitControls, Stage } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";

function Model() {
    const { scene } = useGLTF("/models/scene.gltf");

    const ball_ref = useRef()

    useEffect(() => {
        ball_ref.current.position.y = -10
    }, [])

    useFrame(() => {
        ball_ref.current.rotation.y += 0.01

        //3Dモデルのレスポンシブ対応
        if (window.innerWidth < 992) {
            ball_ref.current.position.y = -6
            ball_ref.current.scale.x = 0.6
            ball_ref.current.scale.y = 0.6
            ball_ref.current.scale.z = 0.6
        } else {
            ball_ref.current.scale.x = 1
            ball_ref.current.scale.y = 1
            ball_ref.current.scale.z = 1
        }
    })
    return (
        <group dispose={null}>
            <mesh ref={ball_ref}>
                <primitive object={scene} />
            </mesh>
        </group>
    );
}

const Three = () => {

    const canvas_ref = useRef()
    const content_ref = useRef()

    useEffect(()=>{
        gsap.fromTo(content_ref.current, {
            opacity: 0,
            translateY: "150px"
        }, {
            scrollTrigger: ".three",
            opacity: 1,
            translateY: "0px",
            duration: 1.5,
        })

        gsap.fromTo(canvas_ref.current, {
            opacity: 0,
            translateX: "-300px"
        }, {
            scrollTrigger: ".three",
            opacity: 1,
            translateX: "0px",
            duration: 1.5,
        })
    },[])

    return (
        <section className="three">

            <div className="content" ref={content_ref}>
                <h2>ユーザーに刺激を</h2>
                <p>アプリ・システム開発において、最も意識していることはユーザーがどのような印象
                    を受けるかである。具体的に、Next.jsを用いたSSGやSSRの高速レンダリングによる
                    ページの高速読み込みを実現させることや、Three.jsを用いた3Dモデルの描画による
                    視覚的インパクトの向上などを意識している。
                </p>
            </div>
            <Canvas ref={canvas_ref}>
                <PerspectiveCamera makeDefault />
                <OrbitControls
                    enableDamping={true}
                    enablePan={true}
                    enableZoom={false}
                    enableRotate={true}
                />
                <Stage>
                    <Model />
                </Stage>
            </Canvas>
        </section>
    );
};
export default Three;
