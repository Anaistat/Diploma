import React, {useEffect, useState} from 'react';
import './AllReviews.scss'
import {Review} from "../../types";
import ReviewService from "../../services/ReviewService";
import Card from "../../components/cards/Card";
import {useParams} from "react-router-dom";


const AllReviews = () => {

    const {product} = useParams()

    const [reviews, setReviews] = useState<Review[]>([])
    useEffect(()=>{
        ReviewService.getPopularReviews().then(res=> {
            (product === 'all')? setReviews(res): setReviews(res.filter(e=>e.product.title === product))
        }).catch(err=>console.warn)
    }, [])

    return (
        <div className="all-reviews">
            <div className='all-reviews__container'>
                {
                    reviews.map(e=><Card review={e} className="card-scaled"/>)
                }
            </div>
        </div>
    );
};

export default AllReviews;