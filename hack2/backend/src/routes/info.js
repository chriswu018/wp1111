// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    

    // TODO Part I-3-a: find the information to all restaurants

    var priceList = [];

    if(priceFilter !== undefined){
        for(let j=0;j<priceFilter.length;j++){
            var priceText = 0;
            for (let i = 0; i < priceFilter[j].length; i++){
                priceText += 1
            }
            priceList.push(priceText);
        };
    }
    
    var searchSet = {};
    if(mealFilter === undefined && typeFilter === undefined){
        searchSet = {
            price : (priceList.length === 0)? {$exists: 1} : {$in: priceList},
        };
    }else if(mealFilter === undefined){
        searchSet = {
            price : (priceList.length === 0)? {$exists: 1} : {$in: priceList},
            tag : {$in: typeFilter},
        };
    }else if(typeFilter === undefined){
        searchSet = {
            price : (priceList.length === 0)? {$exists: 1} : {$in: priceList},
            tag : {$in: mealFilter},
        };
    }else{
        searchSet = {
            price : (priceList.length === 0)? {$exists: 1} : {$in: priceList},
            tag : {$in: mealFilter},
            tag : {$in: typeFilter},
        };
    }

    console.log(searchSet); 
    console.log('sort', sortBy);


    Info.find(searchSet).sort(sortBy).exec(async (err, data) => {
        //console.log(data);
        if(!err){
            //console.log(data);
            await res.status(200).send({ message: 'success', contents: data });
        }else{
            await res.status(403).send({ message: 'error', contents: [] })
        }
    })
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }
    Info.find({id : id}).exec(async (err, data) => {
        //console.log(data);
        if(!err){
            //console.log(data);
            await res.status(200).send({ message: 'success', contents: data });
        }else{
            await res.status(403).send({ message: 'error', contents: [] })
        }
    })


    // TODO Part III-2: find the information to the restaurant with the id that the user requests
}