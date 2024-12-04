import { Pressable, View, Text, StyleSheet } from "react-native";

function BookCard(props){
return(
    
<View style={styles.container}>
    <Pressable onPress={props.onPress}>
        <Text>{props.currentItem.title}</Text>
    </Pressable>
    <Text>pages: {props.currentItem.numOfPages}</Text>
    <Text>Publication Date: {props.currentItem.publicationDate}</Text>
    <Text>isbn13:{props.currentItem.isbn13}</Text>
    <Text>isbn10:{props.currentItem.isbn10}</Text>
    <Text>${props.currentItem.Price}</Text>
    <Text>In Stock: {props.currentItem.Stock}</Text>
</View>

)
}
export default BookCard;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 2,
    },
  });