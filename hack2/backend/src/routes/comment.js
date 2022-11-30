// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ comment.js ]
// * PackageName  [ server ]
// * Synopsis     [ Apis of comment ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Comment from '../models/comment'

exports.GetCommentsByRestaurantId = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.restaurantId
    /****************************************/
    // TODO Part III-3-a: find all comments to a restaurant
    Comment.find({restaurantId : id}).exec(async (err, data) => {
        if(!err){
            //console.log(data);
            await res.status(200).send({ message: 'success', contents: data });
        }else{
            await res.status(403).send({ message: 'error', contents: [] })
        }
    })

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }
}

exports.CreateComment = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const { restaurantId, rating, name, content} = req.body
    /****************************************/
    // TODO Part III-3-b: create a new comment to a restaurant
    try {
        const newComment = new Comment({ restaurantId, rating, name, content });
        console.log("Created Comment", newComment);
        return newComment.save();
    } catch (e) { throw new Error("ScoreCard creation error: " + e); }
}
