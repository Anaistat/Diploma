import React, {useEffect, useState} from 'react';
import "./Profile.scss"
import Card from "../../components/cards/Card";
import UserReview from "./components/UserReview";
import {Button, Paper} from "@mui/material";
import {useSelector} from "react-redux";
import {Review} from "../../types";
import ReviewService from "../../services/ReviewService";
import Preloader from "../../components/preloader/preloader";

const Profile = () => {

    const currentUser:any = useSelector<any>(state=>state.user.user)
    const [userReviews, setUserReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
       if(loading){
           ReviewService.getAllUserReviews(currentUser.id).then(res=> {
               setUserReviews(res)
               setLoading(false)
           }).catch(err=>console.error)
       }
    }, [loading])


    const load = () =>{
        setLoading(true)
    }

    if(loading){
        return(
            <Preloader/>
        )
    }
    else{
        if(currentUser){
            return (
                <Paper className="profile">
                    <div className="user">
                        <img src={currentUser.photo} className="user__photo" alt="user"/>
                        <h2 className="user__name">{currentUser.name}</h2>
                        <span className="user__reg-date">(since {new Date(currentUser.registrationDate).toLocaleDateString()})</span>
                    </div>
                    <div className="user-reviews">
                        <h2 className="user-reviews__title">Reviews ({userReviews.length})</h2>
                        <div className="user-reviews__reviews">
                            {
                                userReviews.map((review, index)=><UserReview key={`userReview-${index}`} callback={load} review={review}/>)
                            }
                        </div>
                    </div>
                </Paper>
            );
        }else{
            return (
                <p>User not found</p>
            )
        }
    }


};

export default Profile;