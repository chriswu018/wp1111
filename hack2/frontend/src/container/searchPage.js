/****************************************************************************
  FileName      [ searchPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the search result ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/searchPage.css'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const SearchPage = () => {
    const { state } = useLocation();
    const [restaurants, setRestaurant] = useState([])
    const getRestaurant = async () => {
        // TODO Part I-3-b: get information of restaurants from DB
        const restaurant = await instance.get('/getSearch',{
            params: { 
                priceFilter: state.priceFilter,
                mealFilter: state.mealFilter,
                typeFilter:state.typeFilter,
                sortBy: state.sortBy,
            }
        });
        
        if(restaurant.data.message === 'success'){
            await setRestaurant(restaurant.data.contents);
           
        }
    }

    useEffect(() => {
        getRestaurant()
    }, [state.priceFilter, state.mealFilter, state.typeFilter, state.sortBy])


    const navigate = useNavigate();
    const ToRestaurant = (id) => {
        // TODO Part III-1: navigate the user to restaurant page with the corresponding id
        navigate('/restaurant/' + id);
    }
    const getPrice = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (priceText)
    }
    const getDescription = (arr) => {
        let str = '';
        str += arr[0];
        for(let i=1;i<arr.length;i++) str += ', ' + arr[i];
        return str
    }
    return (

        <div className='searchPageContainer'>
            {
                restaurants.map((item) => (
                    // TODO Part I-2: search page front-end
                    <div className='resBlock' id={item.id} key={item.id} onClick={() => ToRestaurant(item.id)}>
                        <div className='resImgContainer'>
                            <img className='resImg' src={item.img}></img>
                        </div>
                        <div className='resInfo'>
                            <div className='title'>
                                <p className='name'>{item.name}</p>
                                <p className='price'>{getPrice(item.price)}</p>
                                <p className='distance'>{item.distance/1000} km</p>
                            </div>
                            <p className='description'>
                                {getDescription(item.tag)}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default SearchPage