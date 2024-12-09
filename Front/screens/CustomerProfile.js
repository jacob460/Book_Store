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
    const [untrusted, setUntrusted] = useState("")
    const [selfTrust, setSelfTrust] = useState("Trust/Distrust")

    useEffect(()=>{
         async function grabReviews(){
        const result = await axios.get("http://localhost:8080/customerReviews", {params: {customerID: currentItem.customerID}})
        setReviews(result.data[0])
        console.log(result.data[0])
        const result2 = await axios.get("http://localhost:8080/trust", {params: {trustedID: currentItem.customerID, userID: ctx.customerID}})
        console.log(result2)
        setTrusted(result2.data[0].countTrusted)
        setUntrusted(result2.data[1].countUntrusted)
        if(result2.data[2] != null){
            if(result2.data[2].isTrusted == 1){
                setSelfTrust("trust")
            }else{
                setSelfTrust("do not")
            }
        console.log(result.data[0])
        }else{
            setSelfTrust("have not rated")
        }
        setIsLoaded(true)
        }
        grabReviews()
    },[selfTrust])

    function renderCard(data){
        //await axios.get()
        var current = data.item
        return(<ReviewCard currentItem={current}/>)
    }

    async function trustUser(trust){
        const result = await axios.get("http://localhost:8080/trustUser", {params: {userID: ctx.customerID, trustedID: currentItem.customerID, trust: trust}})
        setTrusted(result.data[0].countTrusted)
        setUntrusted(result.data[1].countUntrusted)
        if(result.data[2] != null){
            if(result.data[2].isTrusted == 1){
                setSelfTrust("trust")
            }else{
                setSelfTrust("do not")
            }
        console.log(result.data[0])
        }else{
            setSelfTrust("have not rated")
        }
    }
    async function cancelTrust(){
        const result = await axios.get("http://localhost:8080/cancelTrust", {params: {userID: ctx.customerID, trustedID: currentItem.customerID}})
        setTrusted(result.data[0].countTrusted)
        setUntrusted(result.data[1].countUntrusted)
        if(result.data[2] != null){
            if(result.data[2].isTrusted == 1){
                setSelfTrust("trust")
            }else{
                setSelfTrust("do not trust")
            }
        }else{
            setSelfTrust("have not rated")
        }
    }

    return(
        <View style={{alignContent:'center'}}>
            <Text>Customer Profile</Text>
            <Text>Username: {currentItem.username}</Text>
            <Text>{trusted} people trust this user</Text>
            <Text>{untrusted} people do not trust this user</Text>
            <Text>You {selfTrust} this user</Text>
            {isLoaded ?
            <View>
                <View style={{flexDirection:'row'}}>
                    <Button title='Trust' onPress={() => trustUser(true)}/>
                    <Button title='Remove Test' onPress={() => cancelTrust()}/>
                    <Button title='Do not Trust' onPress={()=>trustUser(false)}/>
                </View>
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
export default CustomerProfile;


/**TODO: Customer Profiles: A customer should be able to review other customers’ basic
information, some of their comments, and the number of trusters/non-trusters through a
profile page. Besides, he/she should also be able to mark “trusted” or “not-trusted” on
that page as well. */