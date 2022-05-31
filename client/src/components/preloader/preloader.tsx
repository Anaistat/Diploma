import React, {FC} from 'react';
import "./preloader.scss"

const Preloader:FC = () => {
    return (
       <div className="preloader-container">
           <div className="loader">loading</div>
       </div>
    );
};

export default Preloader;