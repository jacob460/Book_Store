import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import ReviewCard from "../components/ReviewCard";
import { Button } from "react-native-web";
import { AuthContext } from "../components/AuthContext";


function CustomerProfileMan(props){

    const ctx = useContext(AuthContext)

    const currentItem = props.route.params.current;
    const [reviews, setReviews] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [trusted, setTrusted] = useState("")
    const [untrusted, setUntrusted] = useState("")
    const [DATA, setDATA] = useState()

    useEffect(()=>{
         async function grabReviews(){
        const result = await axios.get("http://localhost:8080/customerReviews", {params: {customerID: currentItem.customerID}})
        setReviews(result.data[0])
        console.log(result.data[0])
        const result2 = await axios.get("http://localhost:8080/trust", {params: {trustedID: currentItem.customerID, userID: 1}})
        console.log(result2)
        setTrusted(result2.data[0].countTrusted)
        setUntrusted(result2.data[1].countUntrusted)
        const result3 = await axios.get("http://localhost:8080/getCustomerInfo", {params: {customerID: currentItem.customerID}})
        setDATA(result3.data[0])
        console.log(result3.data[0])
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
        <View style={{alignContent:'center'}}>
            <Text>Customer Profile</Text>
            <Text>Username: {currentItem.username}</Text>
            {isLoaded ?
            <View>
                <Text>Name: {DATA[0].fname} {DATA[0].lname}</Text>
                <Text>Address: {DATA[0].address}</Text>
                <Text>Phone Number: {DATA[0].phoneNumber}</Text>
                <Text>{trusted} people trust this user</Text>
                <Text>{untrusted} people do not trust this user</Text>
                <FlatList
                persistentScrollbar={true}
                data={reviews}
                renderItem={renderCard}
                keyExtractor={item => item.reviewID}/>
            </View>
        : null}
        </View>
        
    )
}
export default CustomerProfileMan;


/**TODO: Customer Profiles: A customer should be able to review other customers’ basic
information, some of their comments, and the number of trusters/non-trusters through a
profile page. Besides, he/she should also be able to mark “trusted” or “not-trusted” on
that page as well. */