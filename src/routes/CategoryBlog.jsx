import React, { useEffect, useState } from "react";
import { client } from "../libs/client";
import { useRef } from "react";
import { limittedContent } from "../utils/SettingText";
import { gsap } from "gsap";

const CategoryBlog = () => {
    const location_pathname = window.location.pathname
    const CATEGORY_ID = location_pathname.replace("/category/", "")


    const [blogs, setBlogs] = useState([]);
    const [renderBlogs, setRenderBlogs] = useState([]);
    const [category, setCategory] = useState({})


    const main_ref=useRef();
    const side_ref=useRef();


    useEffect(() => {
        async function getBlogData(endpoint) {
            try {
                const data = await client.get({ endpoint: endpoint });
                return data;
            } catch (err) {
                console.log(err);
            }
        }

        // すべてのブログを取得する処理
        getBlogData("blogs").then((res) => {
            setBlogs(res.contents);
        });

        // すべてのカテゴリを取得する処理
        getBlogData("categories").then((res) => {
            const allcategories = res.contents //すべてのカテゴリ
            setCategory(allcategories.find((cate) => cate.id === CATEGORY_ID));
        });

        //GSAPによるアニメーション処理
        gsap.fromTo(main_ref.current,{
            translateY:"50px",
            opacity:0
        },{
            duration:0.5,
            opacity:1,
            translateY:0
        })
        gsap.fromTo(side_ref.current,{
            translateY:"-50px",
            opacity:0
        },{
            duration:0.5,
            opacity:1,
            translateY:0
        })
    }, []);

    useEffect(() => {
        if (blogs.length > 0) {
            const filteredBlogs = blogs.filter((blog) => blog.category.id === CATEGORY_ID);
            setRenderBlogs(filteredBlogs);
        }
    }, [blogs, CATEGORY_ID]);


    return (
        <div className="blogs categoryPage">
            <div className="content">
                <div className="back-btn">
                    <a href="/blog">
                        <i className="fa-solid fa-arrow-left"></i>
                        <p>戻る</p>
                    </a>
                </div>
                <div className="sidebar" ref={side_ref}>
                    {category ? (
                        <div className="category">
                            <h3 className="title">現在のカテゴリ</h3>
                            <div className="category-list">
                                <div className="category-item">
                                    <i className={category.icon}></i>
                                    <h3>{category.name}</h3>
                                </div>
                            </div>
                        </div>
                    ) : ""}
                </div>
                <div className="main" ref={main_ref}>
                    {category ? (
                        <div className="cards">
                            {renderBlogs.map((blog) => (
                                <div className="card" key={blog.id}>
                                    <a href={`/blog/${blog.id}`}>
                                        <div className="card-header">
                                            <img src={blog.thumbnail.url} alt="" className="card-img" />
                                            <span>
                                                {blog.category && blog.category.name ? blog.category.name : "roading"}
                                            </span>
                                        </div>
                                        <div className="card-body">
                                            <h3>{blog.title}</h3>
                                            <p>{limittedContent(blog.viewer, 40)}</p>
                                        </div>
                                    </a>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    ):(
                        <div className="notfound">
                            <h2>Loading🚀</h2>
                            <p>何も表示されませんか？恐らくデータ取得の際にエラーが発生したか、URLが間違っている可能性があります。</p>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

export default CategoryBlog;