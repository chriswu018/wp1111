import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const router = Router();

const deleteScoreCard = async () => {
    try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
    } catch (e) { throw new Error("Database deletion failed"); }
};

const saveScoreCard = async (name, subject, score) => {
    var exist;
    const existing = await ScoreCard.findOne({ name, subject });
    if (existing){
        exist = 1;
        console.log("Modify ScoreCard");
    }else{
        exist = 0;
        try {
            const newScoreCard = new ScoreCard({ name, subject, score });
            console.log("Created ScoreCard", newScoreCard);
            return newScoreCard.save();
        } catch (e) { throw new Error("ScoreCard creation error: " + e); }
    }
    console.log(exist);
    return exist
};

const queryScoreCard = async (type, queryString) => {
    var existing;
    if(type === 'name') existing = await ScoreCard.find({ name:queryString });
    else existing = await ScoreCard.find({ subject:queryString });
    console.log(existing)
    return existing
};

const queryCheck = async (type, queryString) => {
    var existing;
    if(type === 'name') existing = await ScoreCard.findOne({ name:queryString });
    else existing = await ScoreCard.findOne({ subject:queryString });
    return existing
};

router.delete("/cards", (_, res) => {
    deleteScoreCard();
    res.send({ message: 'Database cleared.' });
});

router.post("/card", async (req, res) => {
    const { name, subject, score } = req.body
    const exist = await saveScoreCard(name, subject, score, exist);
    if(exist === 1) res.json({ message: 'Updating ('+name+','+subject+','+score+')' })
    else res.json({ message: 'Adding ('+name+','+subject+','+score+')' })
});

router.get("/cards", async (req, res) => {
    const { type, queryString } = req.query
    var ans0 = await queryCheck(type, queryString);
    var ans = await queryScoreCard(type, queryString);
    console.log(ans0);
    if(!ans0) res.json({ messages : null, message: type + ' ('+ queryString +') not found!'  })
    else{
        var ms = [];
        for(var i=0;i<ans.length;i++){
            ms[i] = 'Found card with '+type+': ('+ans[i].name+', '+ans[i].subject+', '+ans[i].score+')';
        }
        res.json({ messages : ms, message: 'found!'  })
    }
});

export default router;

