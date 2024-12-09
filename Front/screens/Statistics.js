import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import axios from "axios";
import BookCard from "../components/BookCard";

function Statistics(props){

    const [data, setData] = useState()
    const [books, setBooks] = useState()

    useEffect(()=>{
        grabData()
    }, [])

    async function grabData(){
        const results = await axios.get("http://localhost:8080/profilesStat")
        console.log(results)
        setData(results.data[0])
        const results2 = await axios.get("http://localhost:8080/sales")
        setBooks(results2.data[0])
    }

    function renderCard(data){
        const current = data.item
        return(
        <Pressable onPress={() => props.navigation.navigate("CustomerProfileMan", {current})}>
            <View style={{borderColor: 'black', borderWidth: 2,}}>
                <Text>{data.item.username}</Text>
                <Text>Users that Trust: {data.item.count}</Text>
            </View>
        </Pressable>)
    }
    function renderBooks(data){
        const current = data.item
        return(<BookCard color={'grey'} page={"store"} currentItem={current} onPress={() => props.navigation.navigate("BookData", {current})}/>)
    }

return(
<View>    
    <Text>Statistics</Text>
    <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
        <View style={{flexDirection: 'column'}}>
            <Text style={{textAlign: 'center'}}>Most Trusted Users</Text>
            <FlatList
            persistentScrollbar={true}
            data={data}
            renderItem={renderCard}
            keyExtractor={item => item.username}/>
        </View>
        <View>  
            <Text>Top Book sales</Text>      
            <FlatList
            persistentScrollbar={true}
            data={books}
            renderItem={renderBooks}
            keyExtractor={item => item.isbn13}/>
        </View>
        </View>
    </View>
    )
}
export default Statistics;