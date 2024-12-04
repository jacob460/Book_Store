import { View, Text, Button } from "react-native";

//Manage Stock Level
//Add managers
//Review Statistics
    //book sales
    //customer statistics

function ManDashboard(props){

    return (
    <View>
        <Button title="Add manager" onPress={() => props.navigation.navigate("ManRegister")}/>
        <Button title="Manage Stock" onPress={()=> props.navigation.navigate("StockManagement")}/>
        <Button title="Statistics" onPress={()=> props.navigation.navigate("Statistics")}/>
        <Text>MANAGER DASHBOARD</Text>
    </View>)

}
export default ManDashboard;