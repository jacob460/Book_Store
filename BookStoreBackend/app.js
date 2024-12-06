import express from 'express'
import { createUser, queryBookstore, tryConnection, createManager } from './Backend.js';
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

app.get('/addManager', async(req, res)=>{
    const result = await createManager(req.query.username, req.query.fname, req.query.lname, req.query.password, req.query.addr, req.query.phoneNum);
    return result
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

app.get('/editStock', async(req, res)=>{
    const result = await queryBookstore(`UPDATE bookdata SET Stock=${req.query.newValue} WHERE isbn13=\"${req.query.isbn13}\"`);
    return result
})

app.get('/addCart', async(req, res)=>{
    const result = await queryBookstore(`SELECT amount FROM Cart WHERE isbn13=\"${req.query.isbn13}\" AND customerID=${req.query.customerID}`)
    console.log(result[0].length)
    if(result[0].length == 0){
        await queryBookstore(`INSERT INTO Cart (customerID, isbn13, amount) VALUES (${req.query.customerID}, \"${req.query.isbn13}\", 1)`)
        await queryBookstore(`UPDATE bookdata SET Stock=${req.query.stockValue} WHERE isbn13=\"${req.query.isbn13}\"`)
    }
    else{
        var amount = result[0][0].amount + 1
        console.log(amount)
        await queryBookstore(`UPDATE Cart SET amount=${amount} WHERE customerID=${req.query.customerID} AND isbn13=\"${req.query.isbn13}\"`)
        await queryBookstore(`UPDATE bookdata SET Stock=${req.query.stockValue} WHERE isbn13=\"${req.query.isbn13}\"`)
    }
    res.send("done")
})

app.get('/getCart', async(req,res)=>{
    var result = await queryBookstore(`SELECT * FROM bookdata join Cart WHERE (bookdata.isbn13=Cart.isbn13 AND Cart.customerID=${req.query.customerID});`)
    res.send(result)
})

app.get('/removeFromCart', async(req,res)=>{
    var result = await queryBookstore(`SELECT amount FROM Cart WHERE isbn13=\"${req.query.isbn13}\" AND customerID=${req.query.customerID}`)
    var amount = result[0][0].amount
    console.log("Amount: " + (amount-1))
    console.log((amount-1) == 0)
    if((amount-1) == 0){
        await queryBookstore(`DELETE FROM Cart WHERE customerID=${req.query.customerID} AND isbn13=\"${req.query.isbn13}\"`)
    }else{
        await queryBookstore(`UPDATE Cart SET amount=${amount-1} WHERE customerID=${req.query.customerID} AND isbn13=\"${req.query.isbn13}\"`)
    }
    result = await queryBookstore(`SELECT Stock FROM bookdata WHERE isbn13=\"${req.query.isbn13}\"`)
    var stock = result[0][0].Stock
    console.log("Stock: " + stock)
    await queryBookstore(`UPDATE bookdata SET Stock=${stock+1} WHERE isbn13=\"${req.query.isbn13}\"`)
    res.send(result)
})

app.get('/purchase', async(req,res)=>{
    const result = await queryBookstore(`SELECT * FROM Cart WHERE customerID=\"${req.query.customerID}\"`)
    console.log(result)
    res.send(result)
})

app.use((err, req, next) => {
    //console.error(err.stack);
    //resizeBy.status(500).send('something broke!')
})

app.listen(8080, ()=>{
    console.log('Server is running on port 8080')
})