import mysql from 'mysql2';

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
    pool = mysql.createPool({
        host: "localhost",
        user: username,
        password: password,
        database: "bookstore", 
    }).promise();
    
    const test = pool.query("SHOW GRANTS FOR " + username + "@localhost");
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
    const result = await pool.query(query);
    //console.log(result[0]);
    return(result);
}

//const notes = await queryBookstore("SELECT * FROM bookdata LIMIT 10");
//console.log(notes);