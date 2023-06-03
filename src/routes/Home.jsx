import React, { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import "../styles/Home.css"
import { gsap,Expo } from "gsap";
import About from "../components/About";
import Three from "../components/Three";
import Skill from "../components/Skill"

const Home = () => {

    //GSAPアニメーションで用いるためのDOM要素を取得
    const overlay1 = useRef()
    const img_slider = useRef()
    const homeref = useRef()

    const location_pathname = window.location.pathname


    //GSAPによる読み込み時のアニメーション
    useEffect(() => {
        if (location_pathname !== "/home") {
            gsap.to(overlay1.current, {
                translateY: "-100%",
                duration: 1.2,
                opacity: 0,
                delay: 2
            })
            gsap.to(
                img_slider.current, {
                translateY: "-200%",
                display: "none",
                duration: 3,
                delay: 0.5,
            }
            )
            gsap.fromTo(
                homeref.current, {
                height: "100vh",
                overflow: "hidden"
            }, {
                height: "auto",
                overflow: "visiable",
                delay: 3
            })
        } else {
            gsap.to(overlay1.current, {
                translateY: "-1000%",
                opacity: 0
            })
            gsap.to(
                img_slider.current, {
                translateX: "-1000%",
                opacity: 0,
            }
            )
        }
    }, [])

    return (
        <div className="home" ref={homeref}>
            <div className="overlay" ref={overlay1}></div>
            <div className="img_slider" ref={img_slider}></div>
            <Hero />
            <About />
            <Three />
            <Skill />
        </div>
    )
};

export default Home;
