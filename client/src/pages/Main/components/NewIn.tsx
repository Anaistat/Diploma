import React, {useEffect, useState} from 'react';
import "../Main.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import {Product} from "../../../types";
import ReviewService from "../../../services/ReviewService";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import language from "../../../utilities/language";


const NewIn = () => {

    const lang:any = useSelector<any>(state => state.language.language)

    const [products, setProducts] = useState<Product[]>([])
    useEffect(()=>{
        ReviewService.getAllProducts().then(res=>setProducts(res)).catch(err=>console.warn)
    }, [])


    return (
        <div className="new-in">
            <h2 className="new-in__text block-title">
                {language[lang].newIn}
                <svg width="40" height="50" className="fire-svg" viewBox="0 0 47 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M45.483 31.7604C40.8701 19.8218 24.4456 19.178 28.4122 1.82604C28.706 0.538545 27.3251 -0.45634 26.2085 0.21667C15.543 6.4786 7.87432 19.0317 14.3089 35.4766C14.8378 36.8226 13.2512 38.0808 12.1053 37.203C6.78719 33.1942 6.22894 27.4297 6.69905 23.3039C6.87534 21.7823 4.87737 21.0507 4.0253 22.309C2.02734 25.3522 0 30.2681 0 37.6712C1.11651 54.0575 15.0141 59.0905 20.009 59.7342C27.1488 60.6413 34.8762 59.3246 40.4293 54.2624C46.5407 48.6149 48.7738 39.6024 45.483 31.7604ZM18.2167 46.4788C22.4477 45.4547 24.6219 42.4115 25.2096 39.7195C26.1792 35.5351 22.3889 31.4385 24.9451 24.8254C25.9147 30.2973 34.553 33.7209 34.553 39.6902C34.788 47.0933 26.7374 53.443 18.2167 46.4788Z" fill="#F7B801"/>
                </svg>
            </h2>

            <div className="carousel-container">
                <Swiper
                effect={'coverflow'}
                grabCursor={true}
                slidesPerView={3}
                spaceBetween={100}
                coverflowEffect= {{
                rotate: 10,
                stretch: 0,
                depth: 200,
                modifier: 1,
            }}
                loop= {true}
                autoplay={true}
                speed={2500}
                modules={[EffectCoverflow, Autoplay]}
                className="new-in-slider"
                >
                    {
                        products.map((product, index)=>{
                            return <SwiperSlide className="new-in-slide" key={`slid-${index}`}>
                                <Link to={`/all-reviews/${product.title}`}><img src={product.image} className="new-in-img" alt='slide'/></Link>
                                <p className="slide-name">{product.title}</p>
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default NewIn;