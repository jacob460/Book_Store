import { View, Text, SectionList, Button, Dimensions } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";
import PurchasedCard from "../components/PurchasedCard";

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

function PurchaseHistory(props){

    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
      });

      useEffect(() => {
        const subscription = Dimensions.addEventListener(
          'change',
          ({window, screen}) => {
            setDimensions({window, screen});
          },
        );
        return () => subscription?.remove();
      });

    const ctx = useContext(AuthContext)
    const [DATA, setDATA] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

useEffect(()=>{
    async function grabData(){
        const result = await axios.get("http://localhost:8080/purchaseHistory", {params: {customerID: ctx.customerID}})
        console.log(result.data)
        setDATA(result.data)
        setIsLoaded(true)
    }
    grabData()
    

},[])

function renderitem(data){
    var current = data.item
    var color = "grey"
    return( <PurchasedCard color={color} currentItem={current} onPress={() => props.navigation.navigate("BookData", {current})}/>)
}

const renderSectionHeader = ({ section: { orderID, dateOrdered, price } }) => (
    <View >
      <Text style={{fontSize: 24, alignSelf: 'center',}} >Order Date: {dateOrdered.substr(0,10)}  Price: {price}</Text>
    </View>
  )

    return(
        <View>
            <Text>Purchase History</Text>
            <Button title='TEST' onPress={()=> { console.log("pressed"); console.log(DATA[0].data[0].dateOrdered)}}/>
            {isLoaded ?
            <View style={{maxHeight: dimensions.window.height - 200}}>
                <SectionList
                    sections={DATA}
                    renderItem={renderitem}
                    renderSectionHeader={renderSectionHeader}
                />            
            </View>: null}
        </View>
    )
}

export default PurchaseHistory;