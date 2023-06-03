import React, { useEffect, useRef } from "react";
import { about_section_data } from "../resource/HomeData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

const About = () => {

    const about_content = useRef()
    const img_ref = useRef()

    useEffect(() => {
        gsap.fromTo(about_content.current, {
            opacity: 0,
            translateY: "200px"
        }, {
            scrollTrigger: ".about",
            opacity: 1,
            translateY: "0px",
            duration: 1.5
        })

        gsap.fromTo(img_ref.current, {
            opacity: 0,
            translateX: "300px"
        }, {
            scrollTrigger: ".about",
            opacity: 1,
            translateX: "0px",
            duration: 1.5
        })
    }, [])

    return (

        <section className="about">
            <div className="content" ref={about_content}>
                <h2>{about_section_data.title}</h2>
                <p>{about_section_data.content}</p>
            </div>
            <div className="img" ref={img_ref}>
                <img draggable={false} src={about_section_data.img} alt="pc" />
            </div>
        </section>


    );
};

export default About;
