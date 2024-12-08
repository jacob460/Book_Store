import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import ReviewCard from "../components/ReviewCard";


function CustomerProfile(props){

    const currentItem = props.route.params.current;
    const [reviews, setReviews] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=>{
         async function grabReviews(){
        const result = await axios.get("http://localhost:8080/customerReviews", {params: {customerID: currentItem.customerID}})
        setReviews(result.data[0])
        console.log(result.data[0])
        setIsLoaded(true)
        }
        grabReviews()
    },[])

   

    function renderCard(data){
        //await axios.get()
        var current = data.item
        return(<ReviewCard currentItem={current}/>)
    }

    return(
        <View>
            <Text>Customer Profile</Text>
            <Text>Username: {currentItem.username}</Text>
            {isLoaded ?
            <FlatList
            persistentScrollbar={true}
            data={reviews}
            renderItem={renderCard}
            keyExtractor={item => item.reviewID}/>
        : null}
        </View>
        
    )
}
export default CustomerProfile;


/**TODO: Customer Profiles: A customer should be able to review other customers’ basic
information, some of their comments, and the number of trusters/non-trusters through a
profile page. Besides, he/she should also be able to mark “trusted” or “not-trusted” on
that page as well. */