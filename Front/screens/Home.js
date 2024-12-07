import { useContext, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import FormField from "../components/FormField";
import FlatButton from "../components/FlatButton";
import { validateUser } from "../components/Authenticate";
import { AuthContext } from "../components/AuthContext";
import axios from "axios";

function Home(props){

    const ctx = useContext(AuthContext);
    const [info, setInfo] = useState();
    const [stat, setStat] = useState();
    const [statMsg, setStatMsg] = useState();
    const [authIssue, setAuthIssue] = useState();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleCreate(){
        props.navigation.navigate("Register", {});
    }
    async function handleSubmit(){
        console.log(email);
        console.log(password);
        
        try{
            const data = await validateUser(email, password);
            console.log("validated");
            const information = data.data[0]
            console.log(information)
            if(data.data[0].length == 0){
                setAuthIssue("USERNAME or PASSWORD incorrect");
            }else{
                ctx.auth(email,data.data[2].isManager, data.data[0][0].customerID)
            }
        }catch(error){
            setAuthIssue("AUTHISSUE");
            console.log("UNABLE TO AUTHENTICATE TRY AGAIN: "+error)
        }
    }

       return(
        <View style={styles.container}>
            <FormField label="Email" secure={false} textChange={setEmail}/>
            <FormField label="Password" secure={true} textChange={setPassword}/>
            <FlatButton onPress={handleSubmit}>Submit</FlatButton>
            <FlatButton onPress={async()=> {const test = await axios.get("http://localhost:8080/test"); console.log(test.data[0][0].customerID)}}>TEST</FlatButton>
            <Pressable onPress={handleCreate}>
                <Text>Create an account</Text>
            </Pressable>
            <Text>{authIssue}</Text>
            <Text>{stat}</Text>
            <Text>{statMsg}</Text>
            <Text>{info}</Text>
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

export default Home;