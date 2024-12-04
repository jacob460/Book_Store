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
    console.log(req.query.page)
    const limit = req.query.size
    const offset = req.query.page*limit
    const result = await queryBookstore(`SELECT * FROM bookdata LIMIT ${limit} offset ${offset}`);
    res.send(result)
})

app.get('/bookDetails', async(req, res)=>{
    var resultpart, temp
    var result = []
    //var result = await queryBookstore(`SELECT * FROM bookdata WHERE isbn13=\"${req.query.isbn13}\"`);
    resultpart = await queryBookstore(`SELECT author FROM Book_Author WHERE isbn13=\"${req.query.isbn13}\"`)
        console.log(resultpart)
        console.log(resultpart[0][0].author)
        temp= resultpart[0][0].author
        for(var i = 1; i < resultpart[0].length; i++){
            temp = temp +", "+ resultpart[0][i].author
        }
        console.log(temp)
        result.push({authors:temp})
        resultpart[0] = {}
    resultpart = (await queryBookstore(`SELECT genre FROM Book_Genre WHERE isbn13=\"${req.query.isbn13}\"`))
        temp = ""    
        for(var i = 0; i < resultpart[0].length; i++){
            if(i == 0){    
                temp= resultpart[0][0].genre
            }else{
                temp = temp +", "+ resultpart[0][i].genre
            }
        }
        result.push({genres:temp})
    resultpart = (await queryBookstore(`SELECT publisher FROM Book_Publisher WHERE isbn13=\"${req.query.isbn13}\"`))
        temp = ""    
        for(var i = 0; i < resultpart[0].length; i++){
            if(i == 0){    
                temp= resultpart[0][0].publisher
            }else{
                temp = temp +", "+ resultpart[0][i].publisher
            }
        }
        result.push({publishers: temp})
    resultpart = (await queryBookstore(`SELECT languages FROM Book_Language WHERE isbn13=\"${req.query.isbn13}\"`))    
        temp = ""    
        for(var i = 0; i < resultpart[0].length; i++){
            if(i == 0){    
                temp= resultpart[0][0].languages
            }else{
                temp = temp +", "+ resultpart[0][i].languages
            }
        }
        result.push({languages: temp})
    console.log(result)
    res.send(result)
})
function parseResult(data){
    var result= data[0].author
    for(var i = 1; i < data.length; i++){
        result = result +", "+ data[i].author
    }
    console.log(result)
    return(result)
}

app.use((err, req, next) => {
    //console.error(err.stack);
    //resizeBy.status(500).send('something broke!')
})

app.listen(8080, ()=>{
    console.log('Server is running on port 8080')
})