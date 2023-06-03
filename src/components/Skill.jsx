import React from "react";
import { Skill_data } from "../resource/HomeData";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { gsap } from "gsap";

const Skill = () => {

    const cards_ref=useRef()

    useEffect(()=>{
        gsap.fromTo(cards_ref.current,{
            opacity:0,
            translateY:"200px"
        },{
            opacity:1,
            translateY:"0px",
            scrollTrigger:".skill",
            duration:1.5
        })
    },[])

    return (
        <section className="skill">
            <div className="title">
                <h2>スキル</h2>
            </div>
            <div className="content">
                <div className="cards" ref={cards_ref}>
                    {Skill_data.map((skill) => (
                        <div className="card" key={skill.id}>
                            <div className="card-body">
                                <i className={skill.icon}></i>
                                <h4>{skill.title}</h4>
                                <p>{skill.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skill;
