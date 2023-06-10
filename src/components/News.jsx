import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { limittedContent } from "../utils/SettingText";
import { client } from "../libs/client";
import { gsap } from "gsap";
import { useRef } from "react";

const News = () => {

    const [data, setData] = useState({})

    const [text, setText] = useState("")

    const img_ref = useRef()
    const text_ref = useRef()

    const limitTextCount=100

    useEffect(() => {

        //引数にエンドポイントを指定すれば、microcmsからデータをゲットしてくれる関数
        async function getBlogData(endpoint) {
            const data = await client.get({ endpoint: endpoint })
            return data
        }

        //データを取得。最新のブログをdatahooksに格納
        getBlogData("blogs").then((res) => {
            setData(res.contents[0])
        })

        //GSAPによるアニメーション処理
        gsap.fromTo(img_ref.current, {
            translateX: "400px",
            opacity: "0"
        }, {
            scrollTrigger: ".news",
            opacity: 1,
            translateX: 0,
            duration: 1.5
        })
        gsap.fromTo(text_ref.current, {
            translateX: "-400px",
            opacity: "0"
        }, {
            scrollTrigger: ".news",
            opacity: 1,
            translateX: 0,
            duration: 1.5
        })
    }, []);

    //ブログデータが取得できたときに発火する処理
    useEffect(() => {
        if (data.content) {
            // console.log(data);
            const initialText = data.viewer
            const renderText = limittedContent(initialText, limitTextCount); //文字数を140に制限をかける
            setText(renderText);
        } else {
            setText("データ取得中🚀")
        }

    }, [data])

    return (
        <section className="news">
            <div className="title">
                <h2>最新の記事</h2>
            </div>
            <div className="content">
                <div className="img-content" ref={img_ref}>
                    <img src={data && data.thumbnail && data.thumbnail.url ? data.thumbnail.url : "https://placehold.jp/600x400.png"} alt="" />
                </div>
                <div className="news-content" ref={text_ref}>
                    {/* <div className="overlay"></div> */}
                    <h3>{data.title ? data.title : "データ取得中🚀"}</h3>
                    <p>{text}</p>
                    <a href={`/blog/${data.id ? data.id : ""}`} className="go-blog">見に行く
                        <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default News;
