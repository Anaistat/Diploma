import React from 'react';
import "./introduction.scss"
import {Link} from "react-router-dom";

const Introduction = () => {
    return (
        <div className="introduction">
            <div className="explore">
                <h1 className="explore__title">Explore reviews</h1>
                <p className="explore__text">Lorem Ipsum is simply dummy text of
                    the printing and typesetting industry.
                    Lorem Ipsum has been the industry's
                    standard dummy text ever since the
                    1500s, when an unknown printer took
                    a galley of type and scrambled it. </p>
                <Link to="/main"><button className="explore__start">Get started</button></Link>
            </div>
            <div className="introduction__image"></div>
        </div>
    );
};

export default Introduction;