import React, { useState, useEffect } from 'react'

const CleanUp = () => {
    const [currnetNum, setCurrentNum] = useState(0);
    const incrementNum = () => {
        console.log("Mouse event invoked !");
        setCurrentNum((preNumber) => preNumber + 1);
    };

    useEffect(() => {
        console.log("useEffect in CleanUp invoked !")
        /* マウスをクリックすると起動する */
        window.addEventListener("mousedown", incrementNum);
        /* アンマウント時の処理（処理を解除する） */
        return () => {
            console.log("CleanUp invoked !");
            window.removeEventListener("mousedown", incrementNum);
        };
    }, []);

    return (
        <div>
            {currnetNum}
        </div>
    );
};

export default CleanUp;
