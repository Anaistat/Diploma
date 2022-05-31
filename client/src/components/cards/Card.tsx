import React, {FC} from 'react';
import "./Card.scss"
import Stars from '../stars/Stars';
import {Link} from "react-router-dom";
import {Review} from "../../types";
import {categories} from "../../utilities/categories";
import {Card as MUICard, Paper} from "@mui/material";

interface CardProps {
    className?: string,
    review: Review
}

const Card:FC<CardProps> = ({className , review}) => {

    return (
        <Link to={`/review/${review.id}`} className="link">
            <MUICard className={`review-card ${className || ''}`} style={{
                background: `linear-gradient(90deg, rgba(0,0,0,.1) 0%, rgba(0,0,0,.1) 100%), url("${review.images[0]}")`,
                backgroundSize: 'cover'
            }}>
                <div className="review-card__type" style={{
                    backgroundImage: `url(${categories[review.product.category]})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    filter: localStorage.theme === 'light'?'brightness(1)':'brightness(0.5)'
                }}/>
                <div className="info" style={ {
                    backgroundImage: localStorage.theme === 'light'?'url("https://res.cloudinary.com/dighqotqh/image/upload/v1653121754/reccom/card_srkout.png")':'url("https://res.cloudinary.com/dighqotqh/image/upload/v1653379867/reccom/card_dark_qstt0l.png")'
                } }>
                    <h2 className="info__product-name">{review.product.title}</h2>
                    <p className="info__review-name">{review.title}</p>
                    <div className="info__rating"><Stars score={review.score} width={20} height={20}/></div>
                </div>
                <div className="likes-comments">
                    <Paper className="card-right">
                        <span>{review.commentsCount}</span>
                        <svg width="15" height="15" viewBox="0 0 20 20" fill={localStorage.theme === 'light'?"#000000":'#ffffff'}
                             xmlns="http://www.w3.org/2000/svg" className="card-right__comment">
                            <path
                                d="M19.99 2C19.99 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H16L20 20L19.99 2ZM16 12H4V10H16V12ZM16 9H4V7H16V9ZM16 6H4V4H16V6Z"/>
                        </svg>
                    </Paper>
                    <Paper className="card-right">
                        <span>{review.likes}</span>
                        <svg width="15" height="15" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"
                             className="card-right__like">
                            <path
                                d="M8.88659 16.6603L8.88587 16.6596C6.30081 14.3155 4.19567 12.4057 2.73078 10.6147C1.27162 8.83074 0.5 7.22576 0.5 5.5C0.5 2.69614 2.69614 0.5 5.5 0.5C7.08861 0.5 8.62112 1.24197 9.61932 2.41417L10 2.8612L10.3807 2.41417C11.3789 1.24197 12.9114 0.5 14.5 0.5C17.3039 0.5 19.5 2.69614 19.5 5.5C19.5 7.22577 18.7284 8.83077 17.2691 10.6161C15.8065 12.4055 13.7058 14.3144 11.1265 16.6584L11.1148 16.669L11.1137 16.67L10.0013 17.675L8.88659 16.6603Z"
                                stroke={localStorage.theme === 'light'?"#000000":'#ffffff'}/>
                        </svg>
                    </Paper>
                </div>
            </MUICard>
        </Link>
    );
};

export default Card;