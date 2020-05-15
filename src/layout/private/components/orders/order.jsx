import React from 'react';
import { useParams } from "react-router-dom";
import NavBar from '../navbar/navbar';
import ChooseMeals from './choose-meals'

const Order = () => {

    let { id } = useParams();

    

    return(
        <>
        <NavBar />
        <ChooseMeals pollId={id} />
        </>
    )
}

export default Order