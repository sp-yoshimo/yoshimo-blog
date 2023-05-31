import React from "react";

const BlogDetail = () => {

    const location_pathname = window.location.pathname
    const path= location_pathname.replace("/blog/","")


    return (
        <div>
            <p>BlogDetail</p>
            <p>{path}</p>
        </div>
    );
};

export default BlogDetail;
