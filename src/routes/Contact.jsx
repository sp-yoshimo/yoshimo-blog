import React, { useEffect, useState } from "react";
import "../styles/Contact.css"
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { gsap} from "gsap";

const Contact = () => {

    const [isSubmited, setIsSubmited] = useState(false); //メールが送信されたかの状態管理

    const form = useRef();
    const bg_text=useRef();

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        //GSAPによるアニメーション
        gsap.fromTo(form.current, {
            opacity: 0,
            translateY: "100px",
        }, {
            opacity: 1,
            translateY: 0,
            duration: 0.5,
            delay: 0.3,
        })
        gsap.fromTo(bg_text.current, {
            translateY: "-300px",
        }, {
            duration: 0.8,
            translateY: 0,
            delay: 0.2
        })
    }, [])


    //フォーム送信
    const onSubmit = (data) => {

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            })

        form.current.reset()

        setIsSubmited(true); //メールを送信状態に
    }


    //環境変数の取得
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;



    return (
        <div className="contact">
            <div className="bg-text" ref={bg_text}>CONTACT</div>
            <div className="content">
                <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" name="username" placeholder="名前" {...register("username", { required: true })} />
                    {errors.username && <p className="error">この項目は必須です</p>}
                    <input type="email" name="useremail" placeholder="メールアドレス" {...register("useremail", { required: true })} />
                    {errors.useremail && <p className="error">この項目は必須です</p>}
                    <textarea name="message" placeholder="要件"  {...register("message", { required: true })} />
                    {errors.message && <p className="error">この項目は必須です</p>}
                    <input type="submit" value="送信" className="submit-button" />
                </form>
            </div>
            {isSubmited ? (
                <div className="alert">
                    <p>お問い合わせを送信しました</p>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Contact;
