import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

function BookData(props){

    const [data, setData] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const currentItem = props.route.params.current;

    useEffect(() => {
        async function grabData(){
            const requestdata = await axios.get("http://localhost:8080/bookDetails", {params: {isbn13: currentItem.isbn13}})
            setData(requestdata.data)      
            console.log(requestdata)
            setIsLoaded(true)
        }
        console.log(data)
        grabData()
    },[])

    return(
    
    <View>
    <Text>StorePage</Text>
    {isLoaded ?
    <View style={styles.container}>
    <Text>{currentItem.title}</Text>
    <Text>Authors: {data[0].authors}</Text>
    <Text>publishers: {data[2].publishers}</Text>
    <Text>Languages: {data[3].languages}</Text>
    <Text>pages: {currentItem.numOfPages}</Text>
    <Text>Publication Date: {currentItem.publicationDate}</Text>
    <Text>isbn13:{currentItem.isbn13}</Text>
    <Text>isbn10:{currentItem.isbn10}</Text>
    <Text>${currentItem.Price}</Text>
    <Text>In Stock: {currentItem.Stock}</Text>
    </View>: null}
    </View>)
}

export default BookData;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 2,
    },
  });