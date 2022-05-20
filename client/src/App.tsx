import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/header/header";
import Introduction from "./pages/Introduction/Introduction";
import Main from "./pages/Main/Main";
import Review from "./pages/Review/Review";
import {Button, createTheme, Switch, ThemeProvider} from "@mui/material";
import NewReview from "./pages/NewReview/newReview";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./configs/firebase";
import {Candidate} from "./types";
import AuthController from "./controllers/AuthController";
import AllReviews from "./pages/AllReviews/AllReviews";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#f8c633',
                main: '#F7B801',
                dark: '#ac8000',
                contrastText: '#fff',
            },
            secondary: {
                light: '#bb99fa',
                main: '#AA80F9',
                dark: '#7659ae',
                contrastText: '#000',
            },
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });


    const dispatch = useDispatch()
    localStorage.language?dispatch({type: `${localStorage.language.toUpperCase()}_LANGUAGE`}):dispatch({type: "EN"})

    const [authUser, loading, error] = useAuthState(auth)

    useEffect(()=>{
        if(!authUser) return
        const candidate:Candidate = {
            name: authUser.displayName || 'Anonymous',
            photo: authUser.photoURL || 'https://assets.cdn-shop.com/meinfoto5-de/assets/img/icons/user-icon-37ab5e38a8.svg',
            uid: authUser.uid,
        }
        AuthController.authorize(candidate).then(user=>{
            user?dispatch({type: 'USER', payload: user}):dispatch({type: 'USER', payload: undefined})
        })
    }, [authUser])

  return (
      <ThemeProvider theme={theme}>
        <div className="App">
            <Header/>
           <Routes>
               <Route path='/'>
                   <Route index element={<Introduction/>}/>
                   <Route path="/main" element={<Main/>}/>
                   <Route path="review/:id" element={<Review/>}/>
                   <Route path="/new" element={<NewReview/>}/>
                   <Route path="/profile" element={<Profile/>}/>
                   <Route path="/admin" element={<Admin/>}/>
                   <Route path="/new/:id" element={<NewReview edit={true}/>}/>
                   <Route path="/all-reviews/:product" element={<AllReviews/>}/>
               </Route>
           </Routes>
        </div>
      </ThemeProvider>
  );
}

export default App;
