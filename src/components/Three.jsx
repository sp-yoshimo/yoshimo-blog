import React, { useEffect, useRef } from "react";
import { useGLTF, PerspectiveCamera, OrbitControls, Stage } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

function Model() {
    const { scene } = useGLTF("../../src/assets/models/scene.gltf");

    const ball_ref = useRef()

    useEffect(() => {
        ball_ref.current.position.y = -6
        ball_ref.current.scale.x=0.8
        ball_ref.current.scale.y=0.8
        ball_ref.current.scale.z=0.8
    }, [])

    useFrame(() => {
        ball_ref.current.rotation.y += 0.01
        // console.log(ball_ref.current);
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

    return (
        <section className="three">

            <div className="content">
                <h2>ユーザーに刺激を</h2>
                <p>アプリ・システム開発において、最も意識していることはユーザーがどのような印象
                    を受けるかである。具体的に、Next.jsを用いたSSGやSSRの高速レンダリングによる
                    ページの高速読み込みを実現させることや、Three.jsを用いた3Dモデルの描画による
                    視覚的インパクトの向上などを意識している。左の3Dモデルはドラッグで平行移動や
                    回転といった操作ができるようになっている。
                </p>
            </div>
            <Canvas>
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