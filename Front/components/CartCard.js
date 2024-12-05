import { Pressable, View, Text, StyleSheet } from "react-native";
import FormField from "./FormField";
import { useEffect, useState } from "react";
import { Button } from "react-native-web";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

function CartCard(props){

  const ctx = useContext(AuthContext)

  const [stockValue, setStockValue] = useState(props.currentItem.Stock)
  const [inStock, setInStock] = useState()
  const [cart,  setCart] = useState(true)

return(    
<View style={[styles.container, {backgroundColor: props.color,}]}>
    <Pressable onPress={props.onPress}>
        <Text>{props.currentItem.title}</Text>
    </Pressable>
    <Text>pages: {props.currentItem.numOfPages}</Text>
    <Text>Publication Date: {props.currentItem.publicationDate}</Text>
    <Text>isbn13:{props.currentItem.isbn13}</Text>
    <Text>isbn10:{props.currentItem.isbn10}</Text>
    <Text>${props.currentItem.Price}</Text>    
</View>

)
}
export default CartCard;

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 2,
    },
  });