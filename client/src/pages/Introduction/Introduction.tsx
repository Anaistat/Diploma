import React from 'react';
import "./introduction.scss"
import {Link} from "react-router-dom";

const Introduction = () => {
    return (
        <div className="introduction">
            <div className="explore">
                <h1 className="explore__title">Explore reviews</h1>
                <p className="explore__text">We invite you to plunge into the variety of reviews that can help you choose a movie, book or game. I hope you like it and you also want to leave your personal review that can help someone.</p>
                <Link to="/main"><button className="explore__start">Get started</button></Link>
            </div>
            <div className="introduction__image"></div>
        </div>
    );
};

export default Introduction;