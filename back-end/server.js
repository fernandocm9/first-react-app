import dotenv from 'dotenv'
dotenv.config({path: '../.env'})
import express from 'express'
import pool from './pg.js'
import cors from 'cors'
const app = express()
const PORT = process.env.PORT || 5050
// app.use(cors())
app.use(express.json())


app.get('/goals', async (req, res)=>{
    try {
        const {rows} = await pool.query('SELECT * FROM goals')
        res.send(rows)
    } catch (err) {
        console.log(err)
        fiveHundredErr(err, res)
    }
})

app.get('/goals/:id', async (req, res)=>{
    try {
        const {rows} = await pool.query(`SELECT * FROM goals WHERE id=${req.params.id}`)
        res.send(rows[0])
    } catch (err) {
        fiveHundredErr(err, res)
    }
})

app.post('/goals', async (req, res)=>{
    try {
        const {name, title, body} = req.body
        let obj = {
            text: 'INSERT INTO goals (name, title, body) VALUES ($1, $2, $3)',
            values: [name, title, body]
        }
        await pool.query(obj)
        res.send('successful')
    } catch (err) {
        fiveHundredErr(err, res)
    }
})

app.patch('/goals/:id', async (req, res)=>{
    try {
        const {rows} = await pool.query(`SELECT * FROM goals WHERE id=${req.params.id}`)
        const goal = rows[0]
        const obj = {
            name: req.body.name || goal.name,
            title: req.body.title || goal.title,
            body: req.body.body || goal.body,
        }
        let updateObj = {
            text: 'UPDATE goals SET name=$1, title=$2, body=$3 WHERE id=$4',
            values: [obj.name, obj.title, obj.body, req.params.id]
        }

        await pool.query(updateObj)
        res.send(`updated ${req.params.id}`)
    } catch (err) {
        fiveHundredErr(err, res)
    }
})

app.delete('/goals/:id', async (req, res)=>{
    try {
        await pool.query(`DELETE FROM goals WHERE id=${req.params.id}`)
        res.send(`deleted item ${req.params.id}`)
    } catch (err) {
        fiveHundredErr(err, res)
    }
})

app.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`)
})

function fiveHundredErr(err, res){
    res.status(500).send(err)
}