/*
  Firestore database
  email: jdc308@psu.edu
  passw: 1234567
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import Register from './screens/Register';
import WelcomeManager from './screens/WelcomeManager';
import ManDashboard from './screens/ManDashboard';
import BookList from './screens/BookList';
import BookData from './screens/BookData';
import { useContext } from 'react';
import AuthContextProvider from './components/AuthContext';
import { AuthContext } from './components/AuthContext';
import ManRegister from './screens/ManRegister';
import Statistics from './screens/Statistics';
import StockManagement from './screens/StockManagement';

const Stack = createNativeStackNavigator();

function ManAuthStack(){
  return(
    <Stack.Navigator initialRouteName="WelcomeManager">
      <Stack.Screen name="WelcomeManager" component={WelcomeManager}/>
      <Stack.Screen name="Dashboard" component={ManDashboard}/>
      <Stack.Screen name="BookStore List" component={BookList}/>
      <Stack.Screen name="BookData" component={BookData}/>
      <Stack.Screen name="ManRegister" component={ManRegister}/>
      <Stack.Screen name="StockManagement" component={StockManagement}/>
      <Stack.Screen name="Statistics" component={Statistics}/>
    </Stack.Navigator>);
}

function AuthStack(){
  return(
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name="Welcome" component={Welcome}/>
    <Stack.Screen name="BookStore List" component={BookList}/>
    <Stack.Screen name="BookData" component={BookData}/>
  </Stack.Navigator>);
}
function PreAuthStack(){
  return(
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Home}/>
      <Stack.Screen name="Register" component={Register}/>
    </Stack.Navigator>
  )
}

function Navigation(){
  const ctx = useContext(AuthContext);
  console.log("AUTH UPDATE : " + ctx.isAuth)
  if(ctx.isAuth == false){
    return(<NavigationContainer>
      <PreAuthStack/>
    </NavigationContainer>)
  }
  else{
    console.log(ctx.isMan)
    if(ctx.manager == true){
      return(<NavigationContainer>
        <ManAuthStack/>
      </NavigationContainer>)
    }else{
      return(<NavigationContainer>
        <AuthStack/>
      </NavigationContainer>)
    }
  }
}

export default function App() {


  return (
    <AuthContextProvider>
      <Navigation/>
    </AuthContextProvider>
  );
}