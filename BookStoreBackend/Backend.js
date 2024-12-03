import mysql from 'mysql2';
/**
 * customers
 * customers
 * 
 * supermanager
 * password
 * 
 * root
 * Mechromancer1427
 */
var pool
    /*var pool = mysql.createPool({
        host: "localhost",
        user: "s",
        password: "password",
        database: "bookstore",
    }).promise();
        console.log(error)
    */
export async function tryConnection(username, password){
    var test
    pool = mysql.createPool({
        host: "localhost",
        user: "supermanager",
        password: "password",
        database: "bookstore", 
    }).promise();
    
    //const test = pool.query(`SELECT * FROM customers WHERE username=\"${username}\" AND password=\"${password}\"` );
        test = await pool.query(`SELECT * FROM customers WHERE username=\"${username}\" AND password=\"${password}\"` );
        console.log(test[0].length)
    if(test[0].length == 0){
        test = await pool.query(`SELECT * FROM managers WHERE username=\"${username}\" AND password=\"${password}\"` );
        test.push({isManager:true})
    }else{
        test.push({isManager:false})
    }
        console.log(test[0].length)
    //const test = queryBookstore("SELECT * FROM bookdata LIMIT 15")

    return(test)
}
export async function createUser(username, fname, lname, password, addr, phoneNum){
    pool = mysql.createPool({
        host: "127.0.0.1",
        user: "root",
        password: "Mechromancer1427",
        database: "bookstore", 
    }).promise();
    console.log("CREATE USER:")
    console.log(username);
    console.log(password);
    console.log(addr);
    console.log(fname);
    console.log(lname);
    console.log(phoneNum);
    const test = pool.query(`insert into customers (username, fname, lname, password, address, phoneNumber)values (\"${username}\", \"${fname}\", \"${lname}\", \"${password}\", \"${addr}\", \"${phoneNum}\")`);

    return(test)

}


export async function queryBookstore(query){

    pool = mysql.createPool({
        host: "127.0.0.1",
        user: "root",
        password: "Mechromancer1427",
        database: "bookstore", 
    }).promise();

    const result = await pool.query(query);
    //console.log(result[0]);
    return(result);
}

//const notes = await queryBookstore("SELECT * FROM bookdata LIMIT 10");
//console.log(notes);