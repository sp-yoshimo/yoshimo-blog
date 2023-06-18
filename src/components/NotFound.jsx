import React, { useState } from "react";
import "../styles/App.css"

const NotFound = () => {

    return (
        <div className="not-found">
            <div className="content">
                <h3>ページが見つかりませんでした</h3>
                <p>404 - Not Found</p>
            </div>
        </div>
    );
};

export default NotFound;
