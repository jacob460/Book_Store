import { createContext, useState } from "react";

export const AuthContext = createContext({
    password: "",
    email: "",
    manager: false,
    isAuth: false,
    auth: (token)=>{},
    logout: () => {},
});

function AuthContextProvider({children}){

    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [manager, setManager] = useState();

    function auth(email, password, manager){
        console.log("AUTHCONTEXT: " + email + password + manager)
        setPassword(password);
        setEmail(email);
        setManager(manager);
    }
    function logout(){
        setPassword(null);
        setEmail(null);
        setManager(null);
    }
    const value = {
        password: password,
        email: email,
        manager: manager,
        isAuth: !!password,
        auth: auth,
        logout: logout,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;