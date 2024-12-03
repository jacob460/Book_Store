import express from 'express'
import { createUser, queryBookstore, tryConnection } from './Backend.js';
import cors from 'cors'

const app = express();

app.use(cors())

app.get('/', async (req, res)=>{
    console.log(req.query.username)
    console.log(req.query.password)
    //const result = await queryBookstore("SELECT * FROM bookdata LIMIT 10");
    //console.log(result[0])
    const result = await tryConnection(req.query.username, req.query.password);
    //console.log(result)
    
    res.send(result)
})

app.get('/signUp', async (req, res)=>{
    console.log(req.query)
    console.log(req.query.username) 
    console.log(req.query.fname) 
    console.log(req.query.lname)
    console.log(req.query.password) 
    console.log(req.query.addr) 
    console.log(req.query.phoneNum)
    //const result = await queryBookstore("SELECT * FROM bookdata LIMIT 10");
    //console.log(result[0])
    const result = await createUser(req.query.username, req.query.fname, req.query.lname, req.query.password, req.query.addr, req.query.phoneNum);
    //console.log(result)
    
    res.send(result)
})

app.get('/bookList', async (req, res)=>{
    const result = await queryBookstore("SELECT * FROM bookdata LIMIT 15");
    res.send(result)
})

app.use((err, req, next) => {
    //console.error(err.stack);
    //resizeBy.status(500).send('something broke!')
})

app.listen(8080, ()=>{
    console.log('Server is running on port 8080')
})