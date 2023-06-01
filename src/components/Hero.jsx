import React from "react";
import "../App.css"
import bg_video from "../assets/video/night_load.mp4"
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import vector_img from "../assets/img/Vector.png"


const Hero = () => {

    const typedref = useRef()

    //Typed.jsの処理
    useEffect(() => {
        const options = {
            strings: [
                "The only impossible journey is the one you never begin.",
                "Life is really simple, but we insist on making it complicated.",
                "All you need in this life is ignorance and confidence, and then success is sure.",
                "Do what you feel in your heart to be right - for you'll be criticized anyway.",
                "If you don't like where you are, change it. You're not a tree. ",
            ], // 表示するテキストの配列
            typeSpeed: 40, // テキストがタイプされる速度（ミリ秒）
            backSpeed: 35, // テキストが削除される速度（ミリ秒）
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
            <div className="hero_bg_overlay"></div>
            <video muted autoPlay loop>
                <source src={bg_video} />
            </video>
            <div className="container">
                <img src={vector_img} alt="vector" className="vector" />
                <div className="content">
                    <h2>
                        Yoshimo HomePage
                    </h2>
                    <span ref={typedref}></span>
                    <br />
                    <a href="/blog">BLOG</a>
                </div>
                <div className="scroll">
                    <p>Scroll</p>
                </div>
            </div>
        </div>
    );
};

export default Hero;
