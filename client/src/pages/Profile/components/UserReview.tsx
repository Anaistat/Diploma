import React, {FC, useEffect} from 'react';
import Stars from "../../../components/stars/Stars";
import "../../../components/cards/Card.scss"
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Review} from "../../../types";
import {categories} from "../../../utilities/categories";
import {useSelector} from "react-redux";
import ReviewService from "../../../services/ReviewService";
import {Link} from "react-router-dom";

interface UserReviewProps{
    review: Review | undefined
    callback: () => void
}


const UserReview:FC<UserReviewProps> = ({review, callback}) => {

    const currentUser:any = useSelector<any>(state=>state.user.user)
    const deleteReview = async () =>{
        if(currentUser && review){
            await ReviewService.deleteReview(currentUser.uid, review.id)
            callback()
        }
    }

    if(review){
        return (
            <div className="review-card" style={ {
                background: `linear-gradient(90deg, rgba(0,0,0,.1) 0%, rgba(0,0,0,.1) 100%), url("${review.images[0]}")`,
                backgroundSize: 'cover'
            } }>
                <div className="review-card__type" style={ {
                    backgroundImage: `url(${categories[review.product.category]})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                } }/>
                <div className="info" style={ {
                    backgroundImage: "url('https://res.cloudinary.com/dighqotqh/image/upload/v1653121754/reccom/card_srkout.png')"
                } }>
                    <h2 className="info__product-name">{review.product.title}</h2>
                    <p className="info__review-name">{review.title}</p>
                    <div className="info__rating"><Stars score={review.score} width={20} height={20}/></div>
                </div>
                <div className="likes-comments">
                    <div className="card-right">
                        <IconButton aria-label="delete" color="primary" onClick={deleteReview}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    <div className="card-right">
                        <Link to={`/edit/${review.id}`}>
                            <IconButton aria-label="delete" color="primary">
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <p>No reviews yet</p>
        )
    }
};

export default UserReview;