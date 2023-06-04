import React, { useEffect, useRef, useState } from "react";
import { client } from "../libs/client";
import "../styles/Blog.css";
import { limittedContent } from "../utils/SettingText";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [renderBlogs, setRenderBlogs] = useState([]);
    const searchRef = useRef();

    const [category, setCategory] = useState([]);

    useEffect(() => {
        async function getBlogData(endpoint) {
            try {
                const data = await client.get({ endpoint: endpoint });
                return data;
            } catch (err) {
                console.log(err);
            }
        }

        //すべてのブログを取得する処理
        getBlogData("blogs").then((res) => {
            setBlogs(res.contents);
            setRenderBlogs(res.contents); // 全てのブログを初期表示として設定
        });

        //すべてのカテゴリを取得する処理
        getBlogData("categories").then((res) => {
            setCategory(res.contents);
        });


    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchTerm = searchRef.current.value.toLowerCase();
        const filteredBlogs = blogs.filter((blog) =>
            blog.title.toLowerCase().includes(searchTerm) ||
            blog.viewer.toLowerCase().includes(searchTerm)
        );
        setRenderBlogs(filteredBlogs);
    };

    const handleInputChange = () => {
        if (searchRef.current.value === "") {
            setRenderBlogs(blogs); // リセット時に全てのブログを表示する
        }
    };

    return (
        <div className="blogs">
            <div className="content">
                <div className="main">
                    <form className="search" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="検索"
                            ref={searchRef}
                            onChange={handleInputChange}
                        />
                        <button type="submit">
                            <i className="fas fa-search"></i>
                        </button>
                    </form>
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
                </div>
                <div className="sidebar">
                    <div className="category">
                        <h3 className="title">カテゴリ</h3>
                        <div className="category-list">
                            {category.map((item) => (
                                <div className="category-item" key={item.id}>
                                    <a href={`/category/${item.id}`}>
                                        <i className={item.icon}></i>
                                        <h3>{item.name}</h3>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;