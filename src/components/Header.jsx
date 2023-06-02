import React, { useRef } from "react";
import "../styles/App.css"
import logo from "../assets/img/yoshimo_logo.png"

const Header = () => {


    const burger_button = useRef()
    const nav_items = useRef()

    const hadnleClick = () => {
        burger_button.current.classList.toggle("active")
        nav_items.current.classList.toggle("active")
    }


    return (
        <div className="header" >
            <div className="nav">
                <div className="logo">
                    <img src={logo} width={60} height={60} className="header_img" alt='logo' />
                    <h3 className="header_title">Yoshimo</h3>
                </div>
                <nav>
                    <ul className="nav_items" ref={nav_items}>
                        <li>
                            <a href="/home">HOME</a>
                        </li>
                        <li>
                            <a href="/blog">BLOG</a>
                        </li>
                        <li>
                            <a href="/contact">CONTACT</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <button className="burger_button" onClick={hadnleClick} ref={burger_button}>
                <span></span>
                <span></span>
            </button>
        </div>
    );
};

export default Header;
