import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, Button, Dimensions, FlatList, TextInput, Pressable} from "react-native";
//import { FlatList } from "react-native-web";
import BookCard from "../components/BookCard";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

function StockManagement(props){

    const ctx = useContext(AuthContext);

    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
      });
      const [index, setIndex] = useState(0)
      const [amount, setAmount] = useState(15)
    
      useEffect(() => {
        const subscription = Dimensions.addEventListener(
          'change',
          ({window, screen}) => {
            setDimensions({window, screen});
          },
        );
        return () => subscription?.remove();
      });


    const [data, setData] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        async function grabData(){
            const requestdata = await axios.get("http://localhost:8080/bookList", {params: {page: index, size: amount}})
            setData(requestdata.data[0])      
            console.log(requestdata.data[0])
            setIsLoaded(true)
        }
        grabData()
    },[])

    function renderCard(data){
        var current = data.item     
        return(
        <BookCard currentItem={current} manager={ctx.manager} onPress={() => props.navigation.navigate("BookData", {current})}/>
        )
    }

    async function changePage(action){
        if(action == "Last" && index>0){
            setIndex(index-1)
            const requestdata = await axios.get("http://localhost:8080/bookList", {params: {page: index-1, size:amount}})
            setData(requestdata.data[0])
        }else if(action == "Next"){
            setIndex(index+1)
            const requestdata = await axios.get("http://localhost:8080/bookList", {params: {page: index+1, size: amount}})
            setData(requestdata.data[0])
            console.log(requestdata.data[0])
        }
    }
    async function changePerPage(){
        const requestdata = await axios.get("http://localhost:8080/bookList", {params: {page: index, size: amount}})
        setData(requestdata.data[0])
        console.log(requestdata.data[0])
    }

    function assignSize(txt){
        setAmount(txt)
    }

    return(<View >
        <Text>BOOKSTORE LIST : {amount}</Text>
        <TextInput onChangeText={assignSize}></TextInput>
        <Button title="Per Page" onPress={changePerPage}/>
        <Button title="Add Book" onPress={() => props.navigation.navigate("RegisterBook")}/>
        {isLoaded ? 
        <View style={{maxHeight: dimensions.window.height-200}}>
            <FlatList
            persistentScrollbar={true}
            data={data}
            renderItem={renderCard}
            keyExtractor={item => item.isbn13}/> 
            <View style={{flexDirection: 'row', justifyContent:'center', marginTop: 10,}}>
                <Pressable onPress={() => changePage("Last")}>
                <Text style={{marginHorizontal: 15,}}>Last page</Text>
                </Pressable>
                <TextInput style={{borderColor: 'black', borderWidth: 2}}></TextInput>
                <Pressable onPress={() => changePage("Next")}>
                <Text style={{marginHorizontal: 15,}}>Next Page</Text>
                </Pressable>
            </View>
        </View> : null}

    </View>
   )
}
export default StockManagement;