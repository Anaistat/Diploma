import React, {useEffect, useState} from 'react';
import './AllReviews.scss'
import {Review} from "../../types";
import ReviewService from "../../services/ReviewService";
import Card from "../../components/cards/Card";
import {useParams} from "react-router-dom";
import Preloader from "../../components/preloader/preloader";
import {Paper} from "@mui/material";


const AllReviews = () => {

    const {product} = useParams()

    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(()=>{
       if(loading){
           ReviewService.getPopularReviews().then(res=> {
               (product === 'all')? setReviews(res): setReviews(res.filter(e=>e.product.title === product))
               setLoading(false)
           }).catch(err=>console.warn)
       }
    }, [])

    if(loading){
        return(
            <Preloader/>
        )
    }
    else{
        return (
            <Paper className="all-reviews">
                <div className='all-reviews__container'>
                    {
                        reviews.map(e=><Card review={e} className="card-scaled"/>)
                    }
                </div>
            </Paper>
        );
    }
};

export default AllReviews;