import React, {useEffect, useState} from 'react';
import "./Admin.scss"
import EnhancedTable from "./components/Table";
import {User} from "../../types";
import UserService from "../../services/UserService";
import {useSelector} from "react-redux";
import {Paper} from "@mui/material";

const Admin = () => {

    const [users, setUsers] = useState<User[]>([])
    const admin:any = useSelector<any>(state=>state.user.user)

    useEffect(()=>{
        UserService.getAllUsers(admin.uid).then(res=>setUsers(res)).catch(err=>console.warn)
    }, [])

    return (
        <Paper className="admin">
            <div className="admin__table">
                <EnhancedTable/>
            </div>
        </Paper>
    );
};

export default Admin;