import React, { useEffect } from "react";
import { client } from "../libs/client";
import { useState } from "react";
import "../styles/Blog.css"
import "../styles/RichText.css"
import { gsap } from "gsap";
import { useRef } from "react";

const BlogDetail = () => {

    const location_pathname = window.location.pathname
    const ID = location_pathname.replace("/blog/", "")

    const [blog, setBlog] = useState()

    const container_ref=useRef();
    const back_ref=useRef();

    useEffect(() => {

        //IDからブログを取得する関数
        const getBlogById = async () => {
            try {
                const data = client.get(
                    {
                        endpoint: "blogs",
                        contentId: ID
                    }
                )
                return data
            } catch (err) {
                console.log(err);
            }
        }

        getBlogById()
            .then((res) => {
                setBlog(res)
            })

        gsap.fromTo(container_ref.current,{
            translateY:"200px",
            opacity:0
        },{
            translateY:0,
            opacity:1,
            duration:0.8,
        })
        gsap.fromTo(back_ref.current,{
            translateX:"-500px",
            opacity:0
        },{
            translateX:0,
            opacity:1,
            duration:1,
        })
    }, [])


    return (
        <div className="blog-detail">
            <div className="back-btn" ref={back_ref}>
                <a href="/blog">
                    <i className="fa-solid fa-arrow-left"></i>
                    <p>戻る</p>
                </a>
            </div>
            <div className="container" ref={container_ref}>
                <div className="title">
                    {blog && blog.title ? (
                        <h2>{blog.title}</h2>
                    ) : (
                        ""
                    )}
                    <div className="subtext">
                        <p>{blog && blog.createdAt ? new Date(blog.createdAt).toLocaleString() + "に投稿" : ""}</p>
                        <p>{blog && blog.category ? "カテゴリ : "+blog.category.name : ""}</p>
                    </div>
                </div>
                {blog && blog.thumbnail ? (
                    <img src={blog.thumbnail.url} alt="" className="thumbnail" />
                ) : (
                    <div></div>
                )}
                {blog && blog.content ? (
                    <div className="content" dangerouslySetInnerHTML={{ __html: `${blog.content}` }}></div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};

export default BlogDetail;
