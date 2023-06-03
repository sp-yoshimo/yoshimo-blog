import React from "react";
import { Skill_data } from "../resource/HomeData";
import { useState } from "react";
import { useEffect } from "react";

const Skill = () => {

    // console.log(Skill_data);

    return (
        <section className="skill">
            <div className="title">
                <h2>スキル</h2>
            </div>
            <div className="content">
                <div className="cards">
                    {Skill_data.map((skill) => (
                        <div className="card" key={skill.id}>
                            <i className={skill.icon}></i>
                            <h4>{skill.title}</h4>
                            <p>{skill.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skill;
