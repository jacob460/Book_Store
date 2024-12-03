import { Text, View, StyleSheet, Button } from "react-native";
import { AuthContext } from "../components/AuthContext";
import { useContext, useState } from "react";
import { doc, getDoc, getFirestore, collection, updateDoc } from "firebase/firestore";
import FormField from "../components/FormField";

function Welcome(){

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
        
        <Text style={styles.title}>Email: {ctx.email}</Text>
        <Button title="Logout" onPress={handleLogout}/>
        {editInfo == true 
        ?   (<View style={{marginVertical:15,}}>
            <FormField label="First Name" secure={false} capitalize={"words"} textChange={setFname} info={ctx.email}></FormField>
            <FormField label="Last Name" secure={false} capitalize={"words"} textChange={setLname} info={user?.lname}></FormField>
            <FormField label="Age Name" secure={false} textChange={setAge} keyboard={"number-pad"} info={user?.age}></FormField>
            <View style={styles.buttons}>
                <Button title={"Submit"} onPress={SubmitInfo}/>
                <Button title={"Cancel"} onPress={()=>setEditInfo(!editInfo)}/>
            </View>
            </View>) : (<View style={styles.container}><Button title="Edit User Info" onPress={EditInformation}/></View>)}
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