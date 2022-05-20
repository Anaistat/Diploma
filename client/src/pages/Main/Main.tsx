import React from 'react';
import "./Main.scss"
import Card from "../../components/cards/Card";
import NewIn from "./components/NewIn";
import TopRanked from "./components/TopRanked";
import CreateReview from "./components/CreateReview";
import Explore from "./components/Explore";

const Main = () => {
    return (
        <div className="main">
            <TopRanked/>
            <NewIn/>
            <CreateReview/>
            <Explore/>
            <div className="main__footer"/>
        </div>
    );
};

export default Main;