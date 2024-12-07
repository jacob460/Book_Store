import { View, Text, StyleSheet, Alert, TextInput } from "react-native";
import { useState } from "react";
import FlatButton from "../components/FlatButton";
import FormField from "../components/FormField";
import { createUser } from "../components/Authenticate";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";
import axios from "axios";

function Register(props){

    const ctx = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [address, setAddr] = useState("");
    const [phoneNum, setPhoneNum] = useState(0);
    const [authIssue, setAuthIssue] = useState();

    async function handleSubmit(){
        if(username ==""){
            console.log("EMAIL ERROR: Emails are not the same.");
        }
        if(confPassword != password || password==""){
            console.log("PASSWORD ERROR: Passwords are not the same.");
        }
        if(fname == ""){
            console.log("FIRST NAME ERROR: Enter first name");
        }
        if(lname == ""){
            console.log("LAST NAME ERROR: Enter last name.");
        }
        if(phoneNum == 0){
            console.log("AGE ERROR: Enter age.");
        }
        if(address == ""){
            console.log("ADDRESS ERROR: Enter address.");
        }
        if(username!="" && confPassword == password && fname != "" && lname!="" && phoneNum!=0 && address!=""){
            console.log("Registration submission");

            try{
                const data = await createUser(username, fname, lname, password, address, phoneNum);
                console.log("validated");
                const test = await axios.get("http://localhost:8080/test"); 
                console.log(test.data[0][0].customerID)
                ctx.auth(username, false, data.data[0][0].customerID);
                setAuthIssue("AUTH");
                console.log(data.data)
            }catch(error){
                setAuthIssue("AUTHISSUE");
                console.log("UNABLE TO AUTHENTICATE TRY AGAIN: "+error)
            }
        }
    }

   

    return(
        <View style={styles.container}>
            <FormField label="First Name" secure={false} capitalize={"words"} textChange={setFname}/>
            <FormField label="Last Name" secure={false} capitalize={"words"} textChange={setLname}/>
            <FormField label="Address" secure={false} capitalize={"words"} textChange={setAddr}/>
            <FormField label="Phone Number" secure={false} capitalize={"words"} textChange={setPhoneNum}/>
            <FormField label="Username" secure={false} textChange={setUsername}/>
            <FormField label="Password" secure={true} textChange={setPassword}/>
            <FormField label="Confirm Password" secure={true} textChange={setConfPassword}/>
            <FlatButton onPress={handleSubmit}>Register</FlatButton>
            <Text>{authIssue}</Text>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff6300',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius:25,
        margin:15,
    },
    textInputFields: {
        borderWidth: 2,
        borderColor: "black",
    },
    button :{
        width: 100,
    },
    createAccountText:{
        textAlign: "center",
    },
});

export default Register;