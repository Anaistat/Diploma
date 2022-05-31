import React, {useEffect, useState} from 'react';
import "./Review.scss"
import Comments from "./components/comment/comments";
import Stars from "../../components/stars/Stars";
import Card from "../../components/cards/Card";
import {useParams} from "react-router-dom";
import {Review as ReviewType} from "../../types"
import ReviewService from "../../services/ReviewService";
import ReactMarkdown from "react-markdown";
import ImageSlider from "./components/ImageSlider";
import {categories_reverse} from "../../utilities/categories";
import {Paper} from "@mui/material";
import {useSelector} from "react-redux";

const Review = () => {

    const {id} = useParams()
    const currentUser:any = useSelector<any>(state=>state.user.user)
    const [review, setReview] = useState<ReviewType | undefined>()
    const [suggestedReviews, setSuggestedReviews] = useState<ReviewType[]>([])
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [likes, setLikes] = useState<number[]>([])

    useEffect(()=>{
        ReviewService.getReview(Number(id)).then(res=>setReview(res)).catch(err=>console.error)
        ReviewService.getPopularReviews().then(res=>setSuggestedReviews(res.slice(1,3))).catch(err=>console.warn())
    }, [])

    useEffect(()=>{
        if(currentUser){
            ReviewService.getUserLikes(currentUser.id).then(setLikes).catch(err=>console.warn(err))
        }
    }, [currentUser])


    useEffect(()=>{
        setIsLiked(likes.includes(Number(id)))
    }, [likes])

    const likeReview = async () =>{
        setIsLiked(prev=>!prev)
        if(currentUser){
            (!isLiked)? await ReviewService.likeReview(currentUser.uid, Number(id), currentUser.id): await ReviewService.dislikeReview(Number(id), currentUser.id)
        }
    }

    const likeStyle = {
        like: {
            stroke: '#821313',
            fill: '#821313'
        },
        dislike: {
            stroke: '#000000',
            fill: '#ffffff'
        }
    }

    if(review){
        return (
            <Paper className="review">
                <div className="review__images">

                    <ImageSlider images={review.images}/>
                    <div className="bg-overlay">
                        <p className="bg-overlay__date">{new Date(review.date).toLocaleDateString()}</p>
                        <h2 className="bg-overlay__review-name">{review.title}</h2>
                        <p className="bg-overlay__tags">{
                            review.tags.map((tag, index)=><span className='tag' key={`tag-${index}`}>#{tag}</span>)
                        }
                        </p>
                    </div>
                </div>
                <div className="review__type" style={ {
                    backgroundImage: `url(${categories_reverse[review.product.category]})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                } }>
                    <p className="review__title">{review.product.title}</p>
                    <Stars score={review.score} width={20} height={20}/>
                </div>
                <div className="review-container">
                    <ReactMarkdown className="review-container__text">{review.text}</ReactMarkdown>
                    <div className="review-container__author-likes">
                        <div className="author">
                            <img src={review.author.photo} alt="user" className="author__photo"/>
                            <p className="review-container__text">{review.author.name}</p>
                        </div>
                        <div className="likes">
                            <p className="review-container__text">{review.likes}</p>
                            <svg width="40" height="40" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="likes__heart" onClick={likeReview}>
                                <path d="M8.88659 16.6603L8.88587 16.6596C6.30081 14.3155 4.19567 12.4057 2.73078 10.6147C1.27162 8.83074 0.5 7.22576 0.5 5.5C0.5 2.69614 2.69614 0.5 5.5 0.5C7.08861 0.5 8.62112 1.24197 9.61932 2.41417L10 2.8612L10.3807 2.41417C11.3789 1.24197 12.9114 0.5 14.5 0.5C17.3039 0.5 19.5 2.69614 19.5 5.5C19.5 7.22577 18.7284 8.83077 17.2691 10.6161C15.8065 12.4055 13.7058 14.3144 11.1265 16.6584L11.1148 16.669L11.1137 16.67L10.0013 17.675L8.88659 16.6603Z" stroke="black" style={isLiked?likeStyle.like:likeStyle.dislike}/>
                            </svg>
                        </div>
                    </div>
                </div>
                <Comments/>
                <div className="may-like">
                    <h2 className="may-like__title">You may also like</h2>
                    {
                        suggestedReviews.map(e=><Card review={e}/>)
                    }
                </div>
            </Paper>
        );
    }else{
        return(
            <p>error loading data</p>
        )
    }
};

export default Review;