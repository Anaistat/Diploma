import React, {useState, useRef, useContext, FC, useEffect} from 'react';
import "./newReview.scss"
import "../../App.css"
import ProductChose from "./components/productChose";
import Star from "../../components/stars/Star";
import MDEditor from '@uiw/react-md-editor';
import {Button, Icon, IconButton, Paper, TextField} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
import ReviewService from "../../services/ReviewService";
import {useNavigate, useParams} from "react-router-dom";

interface NewReviewProps{
    edit?:boolean
}


const NewReview:FC<NewReviewProps> = (edit) => {

    const {id} = useParams()
    const [reviewId, setReviewId] = useState<number>(0)
    const [date, setDate] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])
    let tag = ""
    const [score, setScore] = useState<number>(0)
    const [text, setText] = useState<any>("");
    const [reviewName, setReviewName] = useState<string>("")
    const [images, setImages] = useState<FileList | null>()
    const chosenProduct:any = useSelector<any>(state=>state.chosenProduct.product)
    const currentUser:any = useSelector<any>(state=>state.user.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const Input = styled('input')({
        display: 'none',
    });

    const tagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        tag = event.target.value;
    };

    const setName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReviewName(event.target.value)
    };

    const addTags = () =>{
        setTags([...tags, tag])
    }

    const createReview = async () =>{
        if(images && text && reviewName && chosenProduct && currentUser){
            await ReviewService.addNewReview({
                title: reviewName,
                product_id: chosenProduct.id,
                author_id: currentUser.id,
                tags: tags,
                images: images,
                text: text.replace(/[']/g, "’"),
                score: score
            })
        }
        navigate('/main')
    }

    useEffect(()=>{
        if(currentUser && edit){
            ReviewService.getReview(Number(id)).then(res=>{
                if (!res) return
                setScore(res.score)
                setText(res.text)
                dispatch({type: 'CHOSEN_PRODUCT', payload: res.product})
                setReviewId(Number(res.id))
                setTags(res.tags)
                setDate(res.date.toString())
                setReviewName(res.title)
            }).catch(console.warn)
        }
    }, [currentUser])


    const editReview = async () => {
        if(images && text && reviewName && chosenProduct && currentUser){
            await ReviewService.updateReview({
                id: reviewId,
                title: reviewName,
                product_id: chosenProduct.id,
                tags: tags,
                images: images,
                text: text.replace(/[']/g, "’"),
                score: score,
                date
            })
        }
        navigate('/main')
    }

    return (
        <div className="new-review-container">
            <form className="review-form">
                <div className="review-form__inputs">
                    <TextField
                        type="text"
                        name="review"
                        variant="standard"
                        label="Title"
                        color="secondary"
                        className="title"
                        onChange={setName}
                    />
                    <div className="tags-container">
                        {
                            tags.map((e, index)=><span key={index} className="tag">#{e}</span>)
                        }
                        <TextField
                            type="text"
                            name="review"
                            variant="standard"
                            label="Tags"
                            color="secondary"
                            className="tags"
                            onChange={tagChange}
                        />
                        <Icon color="primary" className="add-tag" onClick={addTags}>+</Icon>
                    </div>

                    <div className="images">
                        <p>Images</p>
                        <label htmlFor="icon-button-file">
                            <Input accept="image/*" id="icon-button-file" type="file" multiple onChange={e=>setImages(e.target.files)}/>
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </div>

                    <div className="rating">
                        {
                            Array(5).fill(0).map( (star, index) => <div key={"star"+index} onClick={()=>setScore(index + 1)}><Star isFilled={score > index} width={30} height={30} stroke={'#927c00'}/></div>)
                        }
                    </div>

                </div>
                <ProductChose/>
                <Paper className="review-text" elevation={2}>
                    <MDEditor
                        value={text}
                        onChange={setText}
                        className="review-text__area"
                    />
                    <MDEditor.Markdown/>
                </Paper>
                {
                    edit?
                        <Button variant="contained" type="button" className='publish-button' onClick={editReview}>Save changes</Button>
                        :
                        <Button variant="contained" type="button" className='publish-button' onClick={createReview}>Create review</Button>
                }
            </form>
        </div>
    );
};

export default NewReview;