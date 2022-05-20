import React from 'react';
import "../Main.scss"
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import language from "../../../utilities/language";

const CreateReview = () => {

    const lang:any = useSelector<any>(state=>state.language.language)

    return (
        <div className="create-review">
            <div className="create-review__inner">
                <div className="make-yours">
                    <h2 className="block-title">{language[lang].makeYourOwn}</h2>
                    <p className="make-yours__text">{language[lang].createReviewText}</p>
                    <Link to="/new"><button className="make-yours__create-button">{language[lang].createReview}</button></Link>
                </div>
                <div className="create-review__img"/>
            </div>
        </div>
    );
};

export default CreateReview;