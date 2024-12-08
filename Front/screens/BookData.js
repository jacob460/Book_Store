import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import FormField from "../components/FormField";
import FlatButton from "../components/FlatButton";
import { AuthContext } from "../components/AuthContext";
import ReviewCard from "../components/ReviewCard";

function BookData(props){

    const ctx = useContext(AuthContext)

    const [data, setData] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [reviews, setReviews] = useState()
    const [commentText, setCommentText] = useState("")
    const [rating, setRating] = useState("")
    const [reviewed, setReviewed] = useState(false)
    const currentItem = props.route.params.current;

    useEffect(() => {
        async function grabData(){
            const requestdata = await axios.get("http://localhost:8080/bookDetails", {params: {isbn13: currentItem.isbn13}})
            const reviewData = await axios.get("http://localhost:8080/reviews", {params: {isbn13: currentItem.isbn13}})
            setData(requestdata.data)
            setReviews(reviewData.data[0])      
            console.log(requestdata)
            console.log(reviewData.data[0][0])
            for(var i = 0; i < reviewData.data[0].length; i++){
                console.log(reviewData.data[0][i].username)
                if(reviewData.data[0][i].username == ctx.username){
                    setReviewed(true)
                    break
                }
            }
            setIsLoaded(true)
        }
        console.log(data)
        grabData()
    },[])

    function renderCard(data){
        var current = data.item
        return(<ReviewCard currentItem={current}/>)
    }

    async function submitReview(){
        await axios.get("http://localhost:8080/review", {params: {commentText: commentText, rating: rating, customerID: ctx.customerID, isbn13: currentItem.isbn13}})
    }

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
        {!reviewed ?
        <View style={{borderColor: 'black', borderWidth: 5}}>
            <FormField label="Rating 1-5" secure={false} textChange={setRating} info={rating}/>
            <FormField label="Comment" secure={false} textChange={setCommentText} info={commentText}/>
            <FlatButton onPress={submitReview}>Submit Review</FlatButton>
        </View>
        : null}
        <Text>REVIEWS:</Text>
        <FlatList
                persistentScrollbar={true}
                data={reviews}
                renderItem={renderCard}
                keyExtractor={item => item.reviewID}/>
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