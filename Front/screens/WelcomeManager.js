import { Text, View, StyleSheet, Button } from "react-native";
import { AuthContext } from "../components/AuthContext";
import { useContext, useState } from "react";
import FormField from "../components/FormField";

function WelcomeManager(props){

    const [user, setUser] = useState(null);
    const [editInfo, setEditInfo] = useState(false);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [age, setAge] = useState(0);
    const ctx = useContext(AuthContext);

    function handleLogout(){
           ctx.logout();
    }

    function EditInformation(){
        setFname(user.fname);
        setLname(user.lname);
        setAge(user.age);
        setEditInfo(!editInfo)
    }
    

    return(
    <View style={styles.container}>
        
        <Text style={styles.title}>username: {ctx.username}</Text>
        <Button title="Logout" onPress={handleLogout}/>
        <Button title="Dashboard" onPress={() => props.navigation.navigate("Dashboard")}/>
        <Button title="Store" onPress={() => props.navigation.navigate("BookStore List")}/>
    </View>)
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
    title: {
        marginVertical:10,
        fontSize: 20,
    },
    buttons:{
        marginTop:15,
        flexDirection: "row",
        justifyContent: "space-around"
    },
});

export default WelcomeManager;