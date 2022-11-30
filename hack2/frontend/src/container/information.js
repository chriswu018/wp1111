/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import Stars from '../components/stars';
import '../css/restaurantPage.css'

const Information = ({ info, rating }) => {

    const getTag = (tags) => {
        //console.log(tags);
        return tags.map( (value) => (
            <div className='tag' key={value}>
                {/* TODO Part III-2-a render tags */}
                {value}
            </div>
        ))
    }
    const getPriceTag = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (
            <div className='tag' key={price}>
                {priceText}
                {/* TODO Part III-2-a render price tags; hint: convert price number to dollar signs first */}
            </div>
        )
    }

    const getBusiness = (time) => {
        let TT = [];
        let DD = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
        if(!time.All){
            for(let i=0;i<7;i++){
                if(time[DD[i]]){
                    TT[i] =  time[DD[i]];
                }else{
                    TT[i] = "Closed";
                }
            }
        }else{
            for(let i=0;i<7;i++) TT[i] = time["All"]; 
        }
        return (
            <div className='businessTime'>
                {/* TODO Part III-2-c: render business time for each day*/}
                {DD.map( (value, index) => (
                    <div className='singleDay' key={index}>
                        <div className='day'>{value}</div>
                        <div className='time'>{TT[index]}</div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className='infoContainer'>
            <h2>{info.name}</h2>
            <div className='infoRow'>
                <div className='rate'>
                    {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}

                </div>
                <div className='distance'>{info.distance / 1000} km</div>
            </div>
            <div className='infoRow'>
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    )
}
export default Information