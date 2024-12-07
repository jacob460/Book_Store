import { Pressable, View, Text, StyleSheet } from "react-native";
import FormField from "./FormField";
import { useEffect, useState } from "react";
import { Button } from "react-native-web";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

function PurchasedCard(props){

  const ctx = useContext(AuthContext)

  const [amount, setAmount] = useState(props.currentItem.amount)

useEffect(()=>{

}, [amount])

async function removeFromCart(){
  await axios.get("http://localhost:8080/removeFromCart", {params: {isbn13: props.currentItem.isbn13, customerID: ctx.customerID}})
  setAmount(amount-1)
  ctx.cartControl()
}

return(    
<View style={[styles.container, {backgroundColor: 'grey',}]}>
    <Pressable onPress={props.onPress}>
        <Text>{props.currentItem.title}</Text>
    </Pressable>
    <Text>pages: {props.currentItem.numOfPages}</Text>
    <Text>Publication Date: {props.currentItem.publicationDate}</Text>
    <Text>isbn13:{props.currentItem.isbn13}</Text>
    <Text>isbn10:{props.currentItem.isbn10}</Text>
    <Text>Price: ${props.currentItem.Price}</Text>
    <Text>Purchased: {props.currentItem.amount}</Text>
  </View>

)
}
export default PurchasedCard;

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 2,
    },
  });