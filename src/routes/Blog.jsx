import React, { useEffect, useRef, useState } from "react";
import { client } from "../libs/client";
import "../styles/Blog.css";
import { limittedContent } from "../utils/SettingText";
import { createTheme } from "@mui/material/styles";
import { Pagination, Stack } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { gsap } from "gsap";

const Blog = () => {

    const [blogs, setBlogs] = useState([]); //初期のブログ配列
    const [renderBlogs, setRenderBlogs] = useState([]) //レンダリングするブログ配列
    const searchRef = useRef();

    const [searchWord, setSearchWord] = useState("");

    const main_ref = useRef();
    const side_ref = useRef();
    const bg_text = useRef();

    //ページネーション用の変数
    const [itemOffset, setItemOffset] = useState(0);
    const itemPerPage = 6; //1ページに表示させるブログ数

    const [pageCount, setPageCount] = useState(0)

    const theme = createTheme({
        palette: {
            primary: {
                main: "#007bff",
            },
        },
    });



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
            setRenderBlogs(Paginate(res.contents))
            setPageCount(Math.ceil(res.contents.length / itemPerPage))
        });

        //すべてのカテゴリを取得する処理
        getBlogData("categories").then((res) => {
            setCategory(res.contents);
        });

        //GSAPによるアニメーション処理
        gsap.fromTo(main_ref.current, {
            translateY: "30px",
            opacity: 0
        }, {
            duration: 1,
            opacity: 1,
            translateY: 0
        })
        gsap.fromTo(side_ref.current, {
            translateY: "-30px",
            opacity: 0
        }, {
            duration: 0.5,
            opacity: 1,
            translateY: 0
        })
        gsap.fromTo(bg_text.current, {
            translateY: "-300px",
        }, {
            duration: 0.8,
            translateY: 0,
            delay: 0.2
        })
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchWord(searchRef.current.value);
        const searchTerm = searchRef.current.value.toLowerCase();
        const filteredBlogs = blogs.filter((blog) =>
            blog.title.toLowerCase().includes(searchTerm) ||
            blog.viewer.toLowerCase().includes(searchTerm)
        );
        setRenderBlogs(filteredBlogs);

    };

    const handleInputChange = () => {
        if (searchRef.current.value === "") {
            setSearchWord("");
            setPageCount(Math.ceil(blogs.length / itemPerPage));  //ページカウントの更新
            setRenderBlogs(Paginate(blogs)) //ブログの表示をリセット
        }
    };

    //配列をページネーションして返す関数
    const Paginate = (blog_data) => {
        //ページネーションの処理

        if (blog_data.length > 0) {
            const endOffset = itemOffset + itemPerPage;

            const currentBlogs = blog_data.slice(itemOffset, endOffset)
            return currentBlogs
        }
    }

    const handlePageChange = (e, page) => {
        const newpage = page - 1
        const newOffset = (newpage * itemPerPage) % blogs.length;
        setItemOffset(newOffset);

    }

    useEffect(() => {
        setRenderBlogs(Paginate(blogs)); // レンダリングするブログ配列を更新する
    }, [itemOffset])


    return (
        <ThemeProvider theme={theme}>
            <div className="blogs">
                <div className="bg-text" ref={bg_text}>BLOG</div>
                <div className="content">
                    <div className="main" ref={main_ref}>
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
                        <h3 className="search-result">{searchWord ? `「${searchWord}」の検索結果` : ""}</h3>
                        {renderBlogs ? (
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
                                {searchWord ? "" : (
                                    <div className="paginate">
                                        <Stack spacing={2}>
                                            <Pagination count={pageCount} color="primary" onChange={handlePageChange} />
                                        </Stack>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="search-not-found">Not Found</div>
                        )}

                    </div>
                    <div className="sidebar" ref={side_ref}>
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
        </ThemeProvider>

    );
};

export default Blog;
