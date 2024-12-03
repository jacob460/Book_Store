import axios from "axios";
import { useEffect } from "react";
import { View, Text, Button, FlatList } from "react-native";

function BookList(){
    var data
    async function grabData (){
        
    }
    useEffect(() => {
        async function grabData(){
            const requestdata = await axios.get("http://localhost:8080/bookList", {})
            data = requestdata.data[0]      
            console.log(requestdata)
        }
        grabData()
    },[])

    function renderCard(){
        return(<View>
            <Text>TEST Flatlist</Text>
        </View>)
    }

    return(<View>
        <Text>BOOKSTORE LIST</Text>
        <Text>{data}</Text>
        <FlatList
        data={data}
        keyExtractor={item => item.isbn13}
        renderItem={renderCard}
        />
    </View>)


}
export default BookList;