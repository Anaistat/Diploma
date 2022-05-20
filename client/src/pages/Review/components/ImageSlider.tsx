import React, {FC} from 'react';
import "./ImageSlider.scss"
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import 'swiper/css/autoplay';

interface ImageSliderProps{
    images: string[]
}

const ImageSlider:FC<ImageSliderProps> = ({images}) => {

    return (
        <Swiper
            effect={"fade"}
            loop={true}
            speed={2000}
            navigation={true}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            modules={[EffectFade, Navigation, Autoplay]}
            className='review-description-slider'
        >
            {
                images.map((img, index)=>{
                    return <SwiperSlide key={`slide-${index}`}>
                        <img src={img} alt="image" className="review-img"/>
                    </SwiperSlide>
                })
            }
        </Swiper>



        // <Carousel fade>
        //     {
        //         images.map((img, index)=>{
        //             return <Carousel.Item className="carousel-item" key={'slide-' + index}>
        //                 <img src={img} alt="slide" className="d-block w-100"/>
        //             </Carousel.Item>
        //         })
        //     }
        // </Carousel>
    );
};

export default ImageSlider;