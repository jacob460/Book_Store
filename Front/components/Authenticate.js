
import axios from "axios";


async function auth(username, fname, lname, password, addr, phoneNum, action){
    const APIKEY ="AIzaSyBuC431Dg5Lh7oKDMwq7rXWxO-pjvrsoL4";
    const url = `http://127.0.0.1:8080/${action}`;

    console.log("CALLING AUTH");

    const result = await axios.get(url, {params: {username, fname, lname, password, addr, phoneNum}});
    console.log(result)
    return result;
}

export function validateUser(username, password){
    return auth(username, "", "", password, "", "", "")
}

export function createUser(username, fname, lname, password, addr, phoneNum){
    return auth(username, fname, lname, password, addr, phoneNum, "signUp")
}

export function createManager(username, fname, lname, password, addr, phoneNum){
    return auth(username, fname, lname, password, addr, phoneNum, "addManager")
}