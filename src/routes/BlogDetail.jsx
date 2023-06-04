import React, { useEffect } from "react";
import { client } from "../libs/client";
import { useState } from "react";
import "../styles/Blog.css"
import "../styles/RichText.css"

const BlogDetail = () => {

    const location_pathname = window.location.pathname
    const ID = location_pathname.replace("/blog/", "")

    const [blog, setBlog] = useState()

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
    }, [])

    useEffect(() => {
        console.log(blog);
    }, [blog])


    return (
        <div className="blog-detail">
            <div className="container">
                <div className="title">
                    {blog && blog.title ? (
                        <h2>{blog.title}</h2>
                    ) : (
                        <div>
                            <h2>Loading..🚀</h2>
                        </div>

                    )}
                    <div className="subtext">
                        <p>{blog && blog.createdAt ? new Date(blog.createdAt).toLocaleString() + "に投稿" : ""}</p>
                        <p>カテゴリ : {blog && blog.category ? blog.category.name : "not found"}</p>
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
