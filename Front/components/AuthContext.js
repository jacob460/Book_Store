import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({
    username: "",
    customerID: 0,
    manager: false,
    isAuth: false,
    auth: (token)=>{},
    logout: () => {},
    cartControl: (token)=>{},
    cart: false,
    returnCart: ()=>{},
});

function AuthContextProvider({children}){

    const [username, setUsername] = useState();
    const [manager, setManager] = useState();
    const [customerID, setCustomerID] = useState();
    const [cart, setCart] = useState(false);

    function auth(username, manager, customerID){
        console.log("AUTHCONTEXT: " + username + manager)
        setUsername(username);
        setManager(manager);
        setCustomerID(customerID)
        setCart(false)
    }
    function logout(){
        setUsername(null);
        setManager(null);
        setCustomerID(null);
        setCart(false)
    }
    function cartControl(){
        setCart(!cart)
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