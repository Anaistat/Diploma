import React, {FC, useEffect, useState, useRef} from 'react';
import SingleComment from "./singleComment"
import "./singleComment.scss"
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import ReviewService from "../../../../services/ReviewService";
import {Comment} from '../../../../types'

const Comments:FC = () => {

    const [comments, setComments] = useState<Comment[]>([])
    const [limitedComments, setLimitedComments] = useState<Comment[]>([])
    const [commentLimit, setCommentLimit] = useState<number>(2)
    let commentRef = useRef<HTMLTextAreaElement>(null)
    const {id} = useParams()
    const currentUser:any = useSelector<any>(state=>state.user.user)

    const loadMore = () =>{
        setLimitedComments(comments.slice(0, commentLimit))
        setCommentLimit(prev=>prev+2)
    }

    const getAllComments = () =>{
        if(currentUser){
            ReviewService.getComments(Number(id), currentUser.uid).then(res=> {
                setComments(res)
                setLimitedComments(res.slice(0,2))
            }).catch(err=>console.warn)
        }
    }

    const addComment = async () =>{
        if(commentRef?.current?.value && currentUser){
            await ReviewService.addNewComment(currentUser.uid, currentUser.id, commentRef.current.value, Number(id))
            commentRef.current.value = ""
            getAllComments()
        }
    }

    useEffect(()=>{
        getAllComments()
    }, [])

    return (
        <>
            <div className="comments-container">
                <div className="write-comment">
                    <textarea placeholder="Write a comment" className="write-comment__area" ref={commentRef}/>
                    <button className="send-comment" onClick={addComment}>
                        <svg width="20" height="20" viewBox="5 5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.166 17.4998L27.1098 15.4436L18.9577 23.5811L18.9577 5.83317H16.041L16.041 23.5811L7.90352 15.429L5.83268 17.4998L17.4994 29.1665L29.166 17.4998Z"/>
                        </svg>
                    </button>
                </div>

                {
                    limitedComments.map(comment=><SingleComment comment={comment}/>)
                }
                <button className="comments-container__load-more" onClick={loadMore}>Load more</button>
            </div>
        </>
    );
};

export default Comments;