import React from 'react'

/* firebase */
import { auth } from "../firebase";

const Feed = () => {
    return (
        <div>
            <button onClick={() => auth.signOut()}>
                Logout
            </button>
        </div>
    );
};

export default Feed;
