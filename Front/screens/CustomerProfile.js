import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import ReviewCard from "../components/ReviewCard";
import { Button } from "react-native-web";
import { AuthContext } from "../components/AuthContext";


function CustomerProfile(props){

    const ctx = useContext(AuthContext)

    const currentItem = props.route.params.current;
    const [reviews, setReviews] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [trusted, setTrusted] = useState("")

    useEffect(()=>{
         async function grabReviews(){
        const result = await axios.get("http://localhost:8080/customerReviews", {params: {customerID: currentItem.customerID}})
        setReviews(result.data[0])
        console.log(result.data[0])
        const result2 = await axios.get("http://localhost:8080/trust", {params: {trustedID: currentItem.customerID}})
        setTrusted(result2.data[0][0].count)
        setIsLoaded(true)
        }
        grabReviews()
    },[])

    function renderCard(data){
        //await axios.get()
        var current = data.item
        return(<ReviewCard currentItem={current}/>)
    }

    async function trustUser(trust){
        const result = await axios.get("http://localhost:8080/trustUser", {params: {userID: ctx.customerID, trustedID: currentItem.customerID, trust: trust}})
        console.log(result.data[0][0].count)
        setTrusted(result.data[0][0].count)
        console.log(result)
    }
    async function cancelTrust(){
        const result = await axios.get("http://localhost:8080/cancelTrust", {params: {userID: ctx.customerID, trustedID: currentItem.customerID}})
        setTrusted(result.data[0][0].count)
    }

    return(
        <View>
            <Text>Customer Profile</Text>
            <Text>Username: {currentItem.username}</Text>
            {isLoaded ?
            <View>
                <FlatList
                persistentScrollbar={true}
                data={reviews}
                renderItem={renderCard}
                keyExtractor={item => item.reviewID}/>
                <Text>{trusted} people trust this user</Text>
                <View style={{flexDirection:'row'}}>
                    <Button title='Trust' onPress={() => trustUser(true)}/>
                    <Button title='Remove Test' onPress={() => cancelTrust()}/>
                    <Button title='Do not Trust' onPress={()=>trustUser(false)}/>
                </View>
            </View>
        : null}
        </View>
        
    )
}
export default CustomerProfile;


/**TODO: Customer Profiles: A customer should be able to review other customers’ basic
information, some of their comments, and the number of trusters/non-trusters through a
profile page. Besides, he/she should also be able to mark “trusted” or “not-trusted” on
that page as well. */