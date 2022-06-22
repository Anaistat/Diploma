import React, {useEffect, useState} from 'react';
import './AllReviews.scss'
import {Review} from "../../types";
import ReviewService from "../../services/ReviewService";
import Card from "../../components/cards/Card";
import {useParams} from "react-router-dom";
import Preloader from "../../components/preloader/preloader";
import {Paper} from "@mui/material";
import {useSelector} from "react-redux";


const AllReviews = () => {

    const {product} = useParams()

    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    let searchWord:any = useSelector<any>(state=>state.search.word)

    const filteredReviews:Review[] = reviews

        // .filter(rev=>{
        //     return (rev.title.toLowerCase().includes(searchWord.toLowerCase()) || rev.product.title.toLowerCase().includes(searchWord.toLowerCase()) || rev.tags.forEach(e=>e.includes(searchWord.toLowerCase())))
        // })

    useEffect(()=>{
        console.log(searchWord)
    }, [searchWord])

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
                        filteredReviews.map(e=><Card review={e} className="card-scaled"/>)
                    }
                </div>
            </Paper>
        );
    }
};

export default AllReviews;