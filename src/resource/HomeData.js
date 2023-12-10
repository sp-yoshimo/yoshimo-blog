const about_section_data = {
    title: "様々な技術を駆使",
    img: "https://images.unsplash.com/uploads/1413349410189e2a95d2e/39982a21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    content: "Unityを用いたゲーム開発やHTML,CSSによるフロントエンド開発の勉強を行ってきた。\
    最近ではNode.jsとExpressを用いたRESTfulなAPI構築の勉強や、PythonのDjangoフレームワークによるバックエンド開発の勉強をしている。\
    フロントエンドでは、ReactやNext.jsなどのjavascriptフレームワークを用いてよりモダンなWeb構築の勉強をしている。\
    Unityでのゲーム開発に活かすため、Blenderで3Dモデリング作成の勉強も行っている。"
}


const Skill_data = [
    {
        icon: "fa-brands fa-unity",
        title: "ゲーム開発",
        content: "UnityやUnreal Engine5などを用いたゲーム開発を行ってきた。Unityroomに作ったゲームをWebGL形式\
        で投稿している。Blenderによるモデリングも勉強中だ。",
        id: 1
    },
    {
        icon: "fa-solid fa-code",
        title: "コーディング",
        content: "PythonやJavascriptを勉強してきた。現在はNextやReact、DjangoなどのWeb系のプログラミングを\
        重点的に勉強している。C言語やJavaをいつか習得する予定だ。",
        id: 2
    },
    {
        icon:"fa-solid fa-video",
        title: "動画編集",
        content: "自分が作成したアプリケーションを宣伝する上で動画編集は欠かせない。現在aviutlを勉強中である。\
        映像作成にではBlenderによるCGアニメーションも作成したい。",
        id: 3
    }
]


const SocialButtonsData=[
    {
        name:"twitter",
        icon:"fa-brands fa-twitter",
        url:"https://twitter.com/sp_yoshimo"
    },
    {
        name:"github",
        icon:"fa-brands fa-github",
        url:"https://github.com/sp-yoshimo"
    },
    {
        name:"unityroom",
        icon:"fa-brands fa-unity",
        url:"https://unityroom.com/users/yoshimo_game"
    },
]

export { about_section_data, Skill_data, SocialButtonsData }
