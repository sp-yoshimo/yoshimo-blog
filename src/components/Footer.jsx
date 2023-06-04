import React from "react";
import { SocialButtonsData } from "../resource/HomeData";
import { gsap } from "gsap";
import { useEffect } from "react";
import { useRef } from "react";

const Footer = () => {

    const content_ref = useRef()

    useEffect(() => {
        //GSAPによるアニメーション処理
        gsap.fromTo(content_ref.current, {
            translateY: "200px",
            opacity: 0
        }, {
            scrollTrigger: ".footer",
            opacity: 1,
            translateY: 0,
            duration: 1
        })
    }, [])

    return (
        <footer className="footer">
            <div className="content" ref={content_ref}>
                <div className="social-buttons">
                    {SocialButtonsData.map((button) => (
                        <div className="button" key={button.name}>
                            <a target="_blank" href={button.url}>
                                <i className={button.icon}></i>
                            </a>
                        </div>
                    ))}
                </div>
                <div className="copy">
                    <small>&copy; 2023 Yoshimo Corporation</small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
