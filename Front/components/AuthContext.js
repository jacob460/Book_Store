import { createContext, useState } from "react";

export const AuthContext = createContext({
    username: "",
    customerID: 0,
    manager: false,
    isAuth: false,
    auth: (token)=>{},
    logout: () => {},
});

function AuthContextProvider({children}){

    const [username, setUsername] = useState();
    const [manager, setManager] = useState();
    const [customerID, setCustomerID] = useState();

    function auth(username, manager, customerID){
        console.log("AUTHCONTEXT: " + username + manager)
        setUsername(username);
        setManager(manager);
        setCustomerID(customerID)
    }
    function logout(){
        setUsername(null);
        setManager(null);
        setCustomerID(null);
    }
    const value = {
        username: username,
        customerID: customerID,
        manager: manager,
        isAuth: !!username,
        auth: auth,
        logout: logout,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;