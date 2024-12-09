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
var pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "bookstore", 
}).promise();
  
export async function tryConnection(username, password){
    var test
        test = await pool.query(`SELECT * FROM customers WHERE username=\"${username}\" AND password=sha2(\"${password}\", 256)` );
        console.log(test[0].length)
    if(test[0].length == 0){
        test = await pool.query(`SELECT * FROM managers WHERE username=\"${username}\" AND password=sha2(\"${password}\", 256)` );
        test.push({isManager:true})
    }else{
        test.push({isManager:false})
    }
        console.log(test[0].length)
    return(test)
}
export async function createUser(username, fname, lname, password, addr, phoneNum){
    console.log("CREATE USER:")
    const test = pool.query(`insert into customers (username, fname, lname, password, address, phoneNumber)values (\"${username}\", \"${fname}\", \"${lname}\", sha2(\"${password}\", 256), \"${addr}\", \"${phoneNum}\")`);

    return(test)

}

export async function createManager(username, fname, lname, password, addr, phoneNum){
    console.log("CREATE MANAGER:")
    const test = pool.query(`insert into managers (username, fname, lname, password, address, phoneNumber)values (\"${username}\", \"${fname}\", \"${lname}\", sha2(\"${password}\", 256), \"${addr}\", \"${phoneNum}\")`);
    return(test)
}

export async function queryBookstore(query){
    console.log(query)
    const result = await pool.query(query);
    return(result);
}
