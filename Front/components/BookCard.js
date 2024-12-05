import { Pressable, View, Text, StyleSheet } from "react-native";
import FormField from "./FormField";
import { useEffect, useState } from "react";
import { Button } from "react-native-web";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

function BookCard(props){

  const ctx = useContext(AuthContext)

  const [stockValue, setStockValue] = useState(props.currentItem.Stock)
  const [inStock, setInStock] = useState()
  const [cart,  setCart] = useState(true)

  async function changeStock(){
    const requestdata = await axios.get("http://localhost:8080/editStock", {params: {newValue:stockValue, isbn13:props.currentItem.isbn13}})
  }

  useEffect(()=>{
    if(props.currentItem.Stock == 0){
      setInStock("Out of Stock")
    }else{
      setInStock("In Stock")
    }
  })

  async function addCart(){
    console.log("ADD: " + props.currentItem.isbn13)
    ctx.cartControl(props.currentItem.isbn13, "add")
    const requestdata = await axios.get("http://localhost:8080/addCart", {params: {isbn13: props.currentItem.isbn13, stockValue: props.currentItem.Stock-1, customerID: ctx.customerID}})
    props.currentItem.Stock = props.currentItem.Stock-1
  }

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
    <Text>{props.manager}</Text>
    {props.manager?
      <View>
        <FormField label="Stock" secure={false} capitalize={"words"} textChange={setStockValue} info={stockValue}/>
        <Button title="Submit Stock" onPress={()=>changeStock()}/>
      </View>
    : <View>
        <Text>{inStock}</Text>
        {inStock == "Out of Stock" ? null : <Button title="Add to Cart" onPress={addCart} />}
      </View>}
    
</View>

)
}
export default BookCard;

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 2,
    },
  });