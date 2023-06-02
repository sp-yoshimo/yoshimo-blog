import React from "react";
import "../styles/App.css"
import bg_video from "../assets/video/night_load.mp4"
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { gsap } from "gsap";
import { hero_words } from "../resource/HeroData.js";


const Hero = () => {

    const typedref = useRef()

    const main_block = useRef()
    const sub_block = useRef()
    const sub_text = useRef()
    const scroll_suggest = useRef()

    const location_pathname = window.location.pathname

    const startDelay = location_pathname === "/" ? 2 : 0.3

    //Typed.jsの処理
    useEffect(() => {

        if (location_pathname === "/") {
            //GSAPによるアニメーション処理
            gsap.fromTo(main_block.current, {
                width: "100%",
                height: "100vh",
                borderRadius: 0,
                position: "relative",
            }, {
                position: "absolute",
                width: "80%",
                height: "80vh",
                duration: 1,
                delay: startDelay
            })

            gsap.fromTo(sub_block.current, {
                left: "-400px"
            }, {
                left: "5%",
                duration: 1,
                delay: startDelay
            })

            gsap.fromTo(scroll_suggest.current, {
                bottom: "-300px"
            }, {
                bottom: "30px",
                duration: 1,
                delay: startDelay
            })

            gsap.fromTo(sub_text.current, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 1,
                delay: startDelay + 1.3
            })


        } else if (location_pathname === "/home") {
            gsap.fromTo(main_block.current, {
                width: "100%",
                height: "100vh",
                borderRadius: 0,
                position: "relative",
            }, {
                position: "absolute",
                width: "80%",
                height: "80vh",
                borderRadius: "30px",
                duration: 1,
                delay: startDelay
            })

            gsap.fromTo(sub_block.current, {
                left: "-40%"
            }, {
                left: "5%",
                duration: 1,
                delay: startDelay
            })

            gsap.fromTo(scroll_suggest.current, {
                bottom: "-300px"
            }, {
                bottom: "30px",
                duration: 1,
                delay: startDelay
            })

            gsap.fromTo(sub_text.current, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 1,
                delay: startDelay + 1.3
            })
        }

        const options = {
            strings: hero_words, // 表示するテキストの配列
            typeSpeed: 70, // テキストがタイプされる速度（ミリ秒）
            backSpeed: 35, // テキストが削除される速度（ミリ秒）
            startDelay: location_pathname === "/home" ? 0 : 3000,
            loop: true,
        };

        // Typed.jsのインスタンスを作成
        const typed = new Typed(typedref.current, options);

        // コンポーネントがアンマウントされた時にTyped.jsのインスタンスを破棄
        return () => {
            typed.destroy();
        };
    }, []);


    return (
        <div className="hero">
            <div className="sub_block" ref={sub_block}>
                <p ref={sub_text}>日進月歩</p>
            </div>
            <div className="main_block" ref={main_block}>
                <div className="hero_bg_overlay"></div>
                <video muted autoPlay loop>
                    <source src={bg_video} />
                </video>
                <div className="container">
                    <div className="content">
                        <h2>
                            Yoshimo HomePage
                        </h2>
                        <span ref={typedref}></span>
                        <br />
                        <a href="/blog">BLOG</a>
                    </div>
                </div>
            </div>
            {/* <div className="effect" ref={pc_img}></div> */}
            <div className="scroll" ref={scroll_suggest}>
                <p>Scroll</p>
            </div>
        </div>
    );
};

export default Hero;
