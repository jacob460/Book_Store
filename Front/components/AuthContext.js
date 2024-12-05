import { createContext, useState } from "react";

export const AuthContext = createContext({
    username: "",
    customerID: 0,
    manager: false,
    isAuth: false,
    auth: (token)=>{},
    logout: () => {},
    cartControl: (token)=>{},
    cart: [""],
    returnCart: ()=>{},
});

function AuthContextProvider({children}){

    const [username, setUsername] = useState();
    const [manager, setManager] = useState();
    const [customerID, setCustomerID] = useState();
    const [cart, setCart] = useState([]);

    function auth(username, manager, customerID){
        console.log("AUTHCONTEXT: " + username + manager)
        setUsername(username);
        setManager(manager);
        setCustomerID(customerID)
        setCart([])
    }
    function logout(){
        setUsername(null);
        setManager(null);
        setCustomerID(null);
        setCart([])
    }
    function cartControl(isbn13, action){
        var tempCart = []
        console.log(isbn13 + ": ISBN--ACTION: " + action)
        if(action == "add"){
            tempCart = cart
            tempCart.push(isbn13)
            setCart(tempCart)
        }else if(action == "remove"){
            console.log("REMOVE NOT IMPLEMENTED YET")
        }
    }
    function returnCart(){
        return(cart)
    }
    const value = {
        username: username,
        customerID: customerID,
        manager: manager,
        isAuth: !!username,
        cart: cart,
        auth: auth,
        logout: logout,
        cartControl: cartControl,
        returnCart: returnCart,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;