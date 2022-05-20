import React, {useEffect, useState} from 'react';
import "../Main.scss"
import Card from "../../../components/cards/Card";
import {Review} from "../../../types";
import ReviewService from "../../../services/ReviewService";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import language from "../../../utilities/language";

const Explore = () => {

    const [reviews, setReviews] = useState<Review[]>([])
    const lang:any = useSelector<any>(state => state.language.language)

    useEffect(()=>{
        ReviewService.getRecentReviews().then(res=>setReviews(res.splice(0,4))).catch(err=>console.warn)
    }, [])


    return (
        <div className="explore">
            <div className="explore__text">
                <h2 className="block-title">{language[lang].explore}</h2>
            </div>
            <div className="explore__reviews">
                {
                    reviews.map(e=><Card review={e} className="card-scaled" key={"card-" + e.id}/>)
                }
            </div>
            <div className="explore__more-reviews">
                <Link to="/all-reviews/all"><button className="explore__load-more">{language[lang].moreReviews}</button></Link>
            </div>
        </div>
    );
};

export default Explore;