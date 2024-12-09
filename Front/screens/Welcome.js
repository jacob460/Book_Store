import { Text, View, StyleSheet, Button } from "react-native";
import { AuthContext } from "../components/AuthContext";
import { useContext, useDebugValue, useEffect, useState } from "react";
import FormField from "../components/FormField";
import axios from "axios";

function Welcome(props){

    const [user, setUser] = useState(null);
    const [editInfo, setEditInfo] = useState(false);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [age, setAge] = useState(0);
    const ctx = useContext(AuthContext);
    const [cart, setCart] = useState([]);

    function handleLogout(){
           ctx.logout();
    }

    function EditInformation(){
        setFname(user.fname);
        setLname(user.lname);
        setAge(user.age);
        setEditInfo(!editInfo)
    }

    async function cartOpen(){
        console.log("cartOpen")
        const requestData = await axios.get("http://localhost:8080/getCart", {params: {size: 2, limit: 2, page: 2}})
        console.log(requestData)
        //props.navigation.navigate("Cart")
    }
    
    return(
    <View style={styles.container}>
        
        <Text style={styles.title}>Username: {ctx.username}</Text>
        <Text style={styles.title}>CustomerID: {ctx.customerID}</Text>
        <Button title="Logout" onPress={handleLogout}/>
        <Button title="Store" onPress={() => props.navigation.navigate("BookStore List")}/>
        <Button title="Cart" onPress={() => props.navigation.navigate("Cart")}/>
        <Button title="Purchase History" onPress={() => props.navigation.navigate("PurchaseHistory")}/>
        <Button title="Profiles" onPress={() => props.navigation.navigate("CustomerList")}/>
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

export default Welcome;