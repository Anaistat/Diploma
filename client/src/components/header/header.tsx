import React, {useEffect, useState} from 'react';
import './header.scss'
import {Link, useNavigate} from "react-router-dom";
import Settings from "./components/Settings";
import {useDispatch, useSelector} from "react-redux";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../configs/firebase";
import Authentication from "../../services/Authentication";
import {Candidate, Role, User} from "../../types";
import AuthController from "../../controllers/AuthController";
import {googleProvider} from "../../configs/social";
import language from "../../utilities/language";
import LogoutIcon from '@mui/icons-material/Logout';


const Header = () => {

    const dispatch = useDispatch()
    const currentUser:any = useSelector<any>(state=>state.user.user)
    const lang:any = useSelector<any>(state=>state.language.language)

    const [authUser] = useAuthState(auth)
    let navigate = useNavigate()

    const authentication = async (auth: any, provider: any) => {
        try {
            const res = await Authentication(auth, provider)
            const candidate: Candidate = {
                uid: res.user.uid,
                name: res.user.displayName,
                photo: res.user.photoURL
            }
            const user: User | undefined = await AuthController.authorize(candidate)
            if (user && user.status === 'Active') {
                dispatch({type: 'USER', payload: user})
                navigate('/main')
            } else {
                dispatch({type: 'USER', payload: undefined})
                logout()
            }
        }
        catch (e) {
            console.error('Auth error: ', e)
        }
    }

    const logout = () =>{
        auth.signOut().then(()=>{
            dispatch({type: 'USER', payload: undefined})
            navigate('/main')
        })
    }

    return (
        <header className="header">

                <Link to="/main" className="link">
                    <div className="logo">
                    <img src="https://res.cloudinary.com/dighqotqh/image/upload/v1653035782/reccom/logo_ctrt9p.png" alt="logo" className="logo__img"/>
                    <h1 className="logo__name">Reccom</h1>
                    </div>
                </Link>

            <div className="search">
                <input type="search" className="search__line" placeholder="search"/>
            </div>
                {
                    authUser && currentUser?
                        <div className="settings-login">
                            <Settings userName={currentUser.name} userPhoto={currentUser.photo} role={currentUser.role}/>
                            <LogoutIcon className='settings-login__logout' onClick={()=>logout()}/>
                        </div>
                        :
                        <div className="settings-login">
                            <Settings/>
                            <button className="settings-login__login" onClick={()=>authentication(auth, googleProvider)}>
                                Log in with Google
                                <svg width="20" height="20" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.386 15.6541V22.914H29.9396C28.5595 27.3125 24.8091 30.4608 19.386 30.4608C12.9279 30.4608 7.69276 25.3289 7.69276 19C7.69276 12.6711 12.9279 7.5392 19.386 7.5392C22.2894 7.5392 24.9409 8.5823 26.9857 10.2999L32.4398 4.9533C28.9956 1.8772 24.4137 0 19.386 0C8.67931 0 0 8.5063 0 19C0 29.4937 8.67931 38 19.386 38C35.6592 38 39.2507 23.085 37.6556 15.6788L19.386 15.6541Z" fill="white"/>
                                </svg>
                            </button>
                        </div>
                }

        </header>
    );
};

export default Header;