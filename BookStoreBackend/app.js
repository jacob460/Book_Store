import express from 'express'
import { createUser, queryBookstore, tryConnection, createManager } from './Backend.js';
import cors from 'cors'

const app = express();

function PartialQuery(data, dataName){
    console.log(dataName)
    var partialQuery = ""
    var firstElementFound = false
    for(var i = 0; i < data.length; i++){
        if(data[i]!= ''){
            if(firstElementFound == false){
                partialQuery = `(LOWER(${dataName}) LIKE LOWER(\"%${data[i]}%\")`
                firstElementFound = true
            }else{
                partialQuery = partialQuery + ` OR LOWER(${dataName}) LIKE LOWER(\"%${data[i]}%\")`
            }
            if(i == data.length-1){
                partialQuery = partialQuery + ")"
            }
        }
    }
    console.log(partialQuery)
    return partialQuery
}

app.use(cors())

app.get('/', async (req, res)=>{
    const result = await tryConnection(req.query.username, req.query.password);
    res.send(result)
})

app.get('/signUp', async (req, res)=>{
    await createUser(req.query.username, req.query.fname, req.query.lname, req.query.password, req.query.addr, req.query.phoneNum);
    const customerID = await queryBookstore(`SELECT customerID FROM customers WHERE username=\"${req.query.username}\"`)    
    res.send(customerID)
})

app.get('/bookList', async (req, res)=>{
    console.log(req.query)
    const limit = req.query.size
    const offset = req.query.page*limit
    var query = ""
    var pQuery = []
    var joinQuery = []
    if(req.query.authors[1] != '' || req.query.authors[0]!=''){
        pQuery.push(PartialQuery(req.query.authors, 'author'))
        joinQuery.push(` JOIN book_author ON bookdata.isbn13=book_author.isbn13 `)
    }
    if(req.query.languages[1] != '' || req.query.languages[0]!=''){
        pQuery.push(PartialQuery(req.query.languages, 'languages'))
        joinQuery.push(` JOIN book_language ON bookdata.isbn13=book_language.isbn13 `)
    }
    if(req.query.genres[1] != '' || req.query.genres[0]!=''){
        pQuery.push(PartialQuery(req.query.genres, 'genre'))
        joinQuery.push(` JOIN book_genre ON bookdata.isbn13=book_genre.isbn13 `)
    }
    if(req.query.publishers[1] != '' || req.query.publishers[0]!=''){
        pQuery.push(PartialQuery(req.query.publishers, 'publisher'))
        joinQuery.push( ` JOIN book_publisher ON bookdata.isbn13=book_publisher.isbn13 `)
    }
    if(req.query.title != ''){
        pQuery.push(" (LOWER(title) LIKE LOWER(\"%" + req.query.title + "%\"))")
    }
    console.log(pQuery)
    for(var i = 0; i < joinQuery.length; i++){
        query = query + joinQuery[i]
    }
    for(var i = 0; i < pQuery.length; i++){
        if(i == 0){
            query = query + "WHERE " + pQuery[i]
        }else{
            query = query + " AND " + pQuery[i]
        }
    }
    if(req.query.sort != ""){
        query = query + ` ORDER BY ${req.query.sort}`
    }
    console.log(query)
    //JOIN book_author ON bookdata.isbn13=book_author.isbn13
    const result = await queryBookstore(`SELECT * FROM bookdata ${query} LIMIT ${limit} offset ${offset}`);
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
    var result = ""
    var query = ""
    console.log(req.query)
    //console.log(req.query.authors)
    if(req.query.action == 'ADD BOOK'){
        result = await queryBookstore(`INSERT INTO bookdata VALUES (\"${req.query.isbn10}\", \"${req.query.isbn13}\", \"${req.query.title}\", \"${req.query.publicationDate}\", ${req.query.numOfPages}, ${req.query.Stock}, ${req.query.Price})`)
        console.log(result[0].length)
        for(var i = 0; i < req.query.authors.length; i++){
            result = await queryBookstore(`select * from authors where author=\"${req.query.authors[i]}\"`)
            console.log(result[0].length)
            if(result[0].length == 0){
                await queryBookstore(`insert into authors values (\"${req.query.authors[i]}\")`)
            }
            if(i == result.length-1){
                query = query + `(\"${req.query.isbn13}\", \"${req.query.authors[i]}\")`
            }else{
                query = query + `(\"${req.query.isbn13}\", \"${req.query.authors[i]}\"), `
            }
        }
        await queryBookstore(`INSERT INTO book_author VALUES ${query}`)
        query = ""
        for(var i = 0; i < req.query.publishers.length; i++){
            result = await queryBookstore(`select * from publishers where publishers=\"${req.query.publishers[i]}\"`)
            if(result[0].length == 0){
                await queryBookstore(`insert into publishers values (\"${req.query.publishers[i]}\")`)
            }
            if(i == result.length-1){
                query = query + `(\"${req.query.isbn13}\", \"${req.query.publishers[i]}\") `
            }else{
                query = query + `(\"${req.query.isbn13}\", \"${req.query.publishers[i]}\"), `
            }
        }
        await queryBookstore(`INSERT INTO book_publisher VALUES ${query}`)  
        query = ""
        for(var i = 0; i < req.query.genres.length; i++){
            result = await queryBookstore(`select * from genres where genre=\"${req.query.genres[i]}\"`)
            if(result[0].length == 0){
                await queryBookstore(`insert into genres values (\"${req.query.genres[i]}\")`)
            }
            if(i == result.length-1){
                query = query + `(\"${req.query.isbn13}\", \"${req.query.genres[i]}\")`
            }else{
                query = query + `(\"${req.query.isbn13}\", \"${req.query.genres[i]}\"), `
            }
        }
        await queryBookstore(`INSERT INTO book_genre VALUES ${query}`) 
        query = ""
        for(var i = 0; i < req.query.keywords.length; i++){
            result = await queryBookstore(`select * from keywords where keyword=\"${req.query.keywords[i]}\"`)
            if(result[0].length == 0){
                await queryBookstore(`insert into keywords values (\"${req.query.keywords[i]}\")`)
            }
            if(i == result.length-1){
                query = query + `(\"${req.query.isbn13}\", \"${req.query.keywords[i]}\") `
            }else{
                query = query + `(\"${req.query.isbn13}\", \"${req.query.keywords[i]}\"), `
            }
        }
        await queryBookstore(`INSERT INTO book_keyword VALUES ${query}`)
        query = ""
        for(var i = 0; i < req.query.languages.length; i++){
            result = await queryBookstore(`select * from languages where languages=\"${req.query.languages[i]}\"`)
            if(result[0].length == 0){
                await queryBookstore(`insert into languages values (\"${req.query.languages[i]}\")`)
            }
            if(i == result.length-1){
                query = query + `(\"${req.query.isbn13}\", \"${req.query.languages[i]}\") `
            }else{
                query = query + `(\"${req.query.isbn13}\", \"${req.query.languages[i]}\"), `
            }
        }
        await queryBookstore(`INSERT INTO book_language VALUES ${query}`)   
    }else{
    result = await queryBookstore(`UPDATE bookdata SET Stock=${req.query.newValue} WHERE isbn13=\"${req.query.isbn13}\"`);
    }
    res.send(result)
})

app.get('/reviews', async(req, res) =>{
    var result = ''
    result = await queryBookstore(`select reviewID, username, rating, commentText from reviews join customers on reviews.customerID=customers.customerID where isbn13=\"${req.query.isbn13}\"`)
    console.log(result)
    res.send(result)
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
    var total=0
    const result = await queryBookstore(`SELECT Cart.customerID, Cart.isbn13, Cart.amount, bookdata.Price FROM Cart JOIN bookdata WHERE (Cart.isbn13=bookdata.isbn13) AND Cart.customerID=\"${req.query.customerID}\"`)
    console.log(result[0])
    for(var i = 0; i < result[0].length; i++){
        total = total + (result[0][i].amount * result[0][i].Price)
    }
    console.log("Total: " + total)
    const result2 = await queryBookstore(`INSERT INTO orders (customerID, total, dateOrdered) VALUES (${req.query.customerID}, ${total}, CURDATE())`)
    //orderID, isbn13, amount
    const orderID = await queryBookstore(`SELECT orderID FROM orders ORDER BY orderID DESC LIMIT 1`)
    for(var i = 0; i < result[0].length; i++){
        await queryBookstore(`INSERT INTO ordercontents VALUES (${orderID[0][0].orderID}, \"${result[0][i].isbn13}\", ${result[0][i].amount})`)
    }
    console.log(orderID)
    const result3 = await queryBookstore(`DELETE FROM Cart WHERE customerID=${req.query.customerID}`)
    res.send("Done")
})

app.get('/purchaseHistory', async (req, res) => {
    var response = [{
        'title': 0,
        'data': ["test"] }]
    var test = new Object()
      var buildResponse = []
      buildResponse.push(response[0])  
      //console.log("response:")
      //console.log(buildResponse[1])
        
      //
    const orderIDs = await queryBookstore(`SELECT * FROM  ordercontents JOIN orders ON ordercontents.orderID=orders.orderID JOIN bookdata ON ordercontents.isbn13=bookdata.isbn13 WHERE customerID=\"${req.query.customerID}\"`)
    console.log(orderIDs[0])
    //console.log("\n\n")
    for(var i = 0; i < orderIDs[0].length; i++){
        console.log(orderIDs[0][i].orderID)
        if(test.orderID != orderIDs[0][i].orderID){
            buildResponse.push(JSON.parse(JSON.stringify(test)))
            test.data = []
            test.orderID = orderIDs[0][i].orderID;
            test.dateOrdered = orderIDs[0][i].dateOrdered
            test.price = orderIDs[0][i].total
            test.data.push(orderIDs[0][i])
        }else{
            test.data.push(orderIDs[0][i])
        }
    }
    buildResponse.push(JSON.parse(JSON.stringify(test)))
    buildResponse.shift()
    buildResponse.shift()
    //for(var i = 0; i < buildResponse.length; i++){
    //    console.log(buildResponse[i])
    //}
    //console.log(buildResponse)
    //buildResponse.shift()
    //const result = await queryBookstore(`SELECT * FROM  ordercontents JOIN orders ON ordercontents.orderID=orders.orderID JOIN bookdata ON bookdata.isbn13=ordercontents.isbn13 WHERE orders.customerID=${req.query.customerID}`)
    console.log(buildResponse)
    
    res.send(buildResponse)
})

app.get('/test', async(req,res)=>{
    const customerID = await queryBookstore(`SELECT customerID FROM customers WHERE username=\"username\"`)
    res.send(customerID)
})

app.use((err, req, next) => {
    //console.error(err.stack);
    //resizeBy.status(500).send('something broke!')
})

app.listen(8080, ()=>{
    console.log('Server is running on port 8080')
})