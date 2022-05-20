import React, {useEffect, useState} from 'react';
import "../Main.scss"
import Card from "../../../components/cards/Card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import {Review} from "../../../types";
import ReviewService from "../../../services/ReviewService";
import {useSelector} from "react-redux";
import language from "../../../utilities/language";

const TopRanked = () => {

    const lang:any = useSelector<any>(state => state.language.language)

    const [reviews, setReviews] = useState<Review[]>([])
    useEffect(()=>{
        ReviewService.getPopularReviews().then(res=>setReviews(res.splice(0,5))).catch(err=>console.warn)
    }, [])

    return (
        <div className="top-ranked">
            <div className="top-ranked__text">
                <h2 className="block-title">{language[lang].topRanked}</h2>
            </div>
            <div className="top-ranked__slider-container">
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="top-ranked-swiper"
                >
                    {
                        reviews.map(e=>{
                            return <SwiperSlide className="top-ranked-slide"><Card review={e} className="top-ranked-card"/></SwiperSlide>
                        })
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default TopRanked;