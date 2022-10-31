import express from 'express'

const router = express.Router()
var realNum;

const genNumber = () => {
    return Math.floor(Math.random()*100)
}

router.post('/start', (_, res) => {
    realNum = genNumber() // ⽤亂數產⽣⼀個猜數字的 number，存在 memory DB
    res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
// 去 (memory) DB 拿答案的數字
// ⽤ req.query.number 拿到前端輸入的數字
    let guessNum = req.query.number
// check if NOT a num or not in range [1,100]
    if(guessNum < 1 || guessNum > 100)
        res.status(406).send({ msg: 'Not a legal number.' })
    else if(guessNum < realNum)
        res.json({ msg: 'Bigger' })
    else if(guessNum > realNum)
        res.json({ msg: 'Smaller' })
    else
        res.json({ msg: 'Equal' })
// 如果有問題 =>
// res.status(406).send({ msg: 'Not a legal number.' })
// 如果沒有問題，回傳 status
})

router.post('/restart', (_, res) => { 
    realNum = genNumber() // ⽤亂數產⽣⼀個猜數字的 number，存在 memory DB
    res.json({ msg: 'The game has restarted.' })
})

export default router