import { Pressable, View, Text, StyleSheet } from "react-native";
import FormField from "./FormField";
import { useEffect, useState } from "react";
import { Button } from "react-native-web";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

function ReviewCard(props){

  const ctx = useContext(AuthContext)
  const [useful, setUseful] = useState(0)
  const [useless, setUseless] = useState(0)
  const [veryUseful, setVeryUseful] = useState(0)
  const [changed, setChanged] = useState(false)

  async function setUsefulness(data){
    await axios.get("http://localhost:8080/usefullness", {params: {customerID: ctx.customerID ,reviewID: props.currentItem.reviewID, usefulness: data}})
    setChanged(!changed)
  }
  useEffect(()=>{
    async function usefullness(){
      const result = await axios.get("http://localhost:8080/determineUsefulness", {params: {reviewID: props.currentItem.reviewID}})
      var u = 0,vu = 0, nu = 0
      for(var i = 0; i < result.data[0].length; i++){
        console.log(result.data[0][i])
        if(result.data[0][i].usefulness == "useful"){
          u++
        }
        else if(result.data[0][i].usefulness == "useless"){
          nu++
        }
        else if(result.data[0][i].usefulness == "very useful"){
          vu++
        }
      }
      setUseful(u)
      setUseless(nu)
      setVeryUseful(vu)
      console.log(result)
    }
    usefullness()

  }, [changed])
 

  return(
    <View style={{borderColor: 'black', borderWidth: 2}}>
        <Text>Username: {props.currentItem.username}</Text>
        <Text>Comment: {props.currentItem.commentText}</Text>
        <Text>Rating: {props.currentItem.rating}/5</Text>
        <View style={{flexDirection: 'row'}}>
          <Button title="Useless" onPress={()=> setUsefulness("useless")}/>
          <Button title="Useful" onPress={()=> setUsefulness("useful")}/>
          <Button title="Very Useful" onPress={()=> setUsefulness("very useful")}/>
        </View>
          <Text>{veryUseful} people found this very useful</Text>
          <Text>{useful} people found this useful</Text>
          <Text>{useless} people found this useless</Text>
    </View>)

}
export default ReviewCard;

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 2,
    },
  });