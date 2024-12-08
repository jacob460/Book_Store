import { View, Text, FlatList, Pressable } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

function CustomerList(props){

    const [data, setData] = useState()
    const [isLoaded, setIsLoaded] = useState()

    useEffect(()=>{
        grabData()
    }, [])

    async function grabData(){
        const results = await axios.get("http://localhost:8080/profilesList")
        setData(results.data[0])
        console.log(results)
    }

    function renderCard(data){
        const current = data.item
        return(
        <Pressable onPress={() => props.navigation.navigate("CustomerProfile", {current})}>
            <View style={{borderColor: 'black', borderWidth: 2,}}>
                <Text>{data.item.username}</Text>
            </View>
        </Pressable>)
    }

    return(
    <View>
        <Text>Profiles</Text>
        <FlatList
            persistentScrollbar={true}
            data={data}
            renderItem={renderCard}
            keyExtractor={item => item.username}/> 
    </View>)
}
export default CustomerList;