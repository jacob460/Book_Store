import { createContext, useState } from "react";

export const AuthContext = createContext({
    password: "",
    email: "",
    isAuth: false,
    auth: (token)=>{},
    logout: () => {},
});

function AuthContextProvider({children}){

    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    function auth(email, password){
        setPassword(password);
        setEmail(email);
        
    }
    function logout(){
        setPassword(null);
        setEmail(null);
    }
    const value = {
        password: password,
        email: email,
        isAuth: !!password,
        auth: auth,
        logout: logout,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;