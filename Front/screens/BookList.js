import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { View, Text, Button, Dimensions, FlatList, TextInput, Pressable} from "react-native";
import BookCard from "../components/BookCard";
import { AuthContext } from "../components/AuthContext";
import FormField from "../components/FormField";
import FlatButton from "../components/FlatButton";

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

function BookList(props){

    const ctx = useContext(AuthContext)

    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
      });
      const [index, setIndex] = useState(0)
      const [amount, setAmount] = useState(15)
      const [update, setUpdate] = useState(false)
      const [author, setAuthor] = useState("")
      const [genre, setGenre] = useState("")
      const [keyword, setKeyword] = useState("")
      const [publisher, setPublisher] = useState("")
      const [language, setLanguage] = useState("")
      const [title, setTitle] = useState("")
      const [sort, setSort] = useState("")
    
      useEffect(() => {
        const subscription = Dimensions.addEventListener(
          'change',
          ({window, screen}) => {
            setDimensions({window, screen});
          },
        );
        return () => subscription?.remove();
      });


    const [data, setData] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        handleSubmit()
    },[ctx.cart])

    function renderCard(data){
        var current = data.item
        var color = "grey"
        //select * from bookdata inner join book_author where bookdata.isbn13=book_author.isbn13 AND bookdata.isbn13="0073999140774";
        if(current.Stock==0){ color = "red"}
        return(
        <BookCard color={color} page={"store"} currentItem={current} onPress={() => props.navigation.navigate("BookData", {current})}/>
        )
    }

    async function changePage(action){
        if(action == "Last" && index>0){
            setIndex(index-1)
            const requestdata = await axios.get("http://localhost:8080/bookList", {params: {page: index-1, size:amount}})
            setData(requestdata.data[0])
        }else if(action == "Next"){
            setIndex(index+1)
            const requestdata = await axios.get("http://localhost:8080/bookList", {params: {page: index+1, size: amount}})
            setData(requestdata.data[0])
            console.log(requestdata.data[0])
        }
    }
    async function changePerPage(){
        const requestdata = await axios.get("http://localhost:8080/bookList", {params: {page: index, size: amount}})
        setData(requestdata.data[0])
        console.log(requestdata.data[0])
    }

    function assignSize(txt){
        setAmount(txt)
    }

    function removeErroneousWhitespace(data){
        for(var i = 0; i < data.length; i++){
            data[i] = data[i].trim()
        }
    }
    async function handleSubmit(){
        setIsLoaded(false)
        var publishers = ["", ""]
        if(publisher.includes(",")){
            publishers = publisher.split(",")
        }else{
            publishers.pop()
            publishers.push(publisher)
        }
        var authors = ["", ""]
        if(author.includes(",")){
            authors = author.split(",")
        }else{
            authors.pop()
            authors.push(author)
        }
        var genres = ["", ""]
        if(genre.includes(",")){
            genres = genre.split(",")
        }else{
            genres.pop()
            genres.push(genre)
        }
        var languages = ["", ""]
        if(language.includes(",")){
            languages = language.split(",")
        }else{
            languages.pop()
            languages.push(language)
        }
        removeErroneousWhitespace(publishers)
        removeErroneousWhitespace(authors)
        removeErroneousWhitespace(genres)
        removeErroneousWhitespace(languages)
        console.log(publishers)
        const requestdata = await axios.get("http://localhost:8080/bookList", {params: {page: index, size: amount,
            publishers: publishers, genres: genres, authors: authors, languages: languages, title: title, sort: sort},
            paramsSerializer: {
                indexes: null, // use brackets with indexes
            }})
        setData(requestdata.data[0])      
        console.log(requestdata.data[0])
        setIsLoaded(true)
    }

    function sortYear(direction){
        setSort(`publicationDate ${direction}`)
    }
    function sortRating(direction){
        setSort(`avg_rating ${direction}`)
    }
    function clearSort(){
        setSort("")
    }

    

    return(<View >
        <Text>BOOKSTORE LIST : {amount}</Text>
        <TextInput onChangeText={assignSize}></TextInput>
        <Button title="Per Page" onPress={changePerPage}/>
        {isLoaded ? 
        <View style={{height: dimensions.window.height - 200}}>
            <FormField label="Title" secure={false} textChange={setTitle} info={title}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <FormField label="Authors" secure={false} textChange={setAuthor} info={author}/>
            <FormField label="Publishers" secure={false} textChange={setPublisher} info={publisher}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <FormField label="Genres" secure={false} textChange={setGenre} info={genre}/>
            <FormField label="Languages" secure={false} textChange={setLanguage} info={language}/>
            </View>
            <View style={{flexDirection: 'row'}}>
                <FlatButton onPress={handleSubmit}>Submit</FlatButton>
                <FlatButton onPress={() => sortYear("ASC")}>Sort by Year Ascending</FlatButton>
                <FlatButton onPress={() => sortYear("DESC")}>Sort by Year Descending</FlatButton>
                <FlatButton onPress={() => sortRating("ASC")}>Sort by Rating Ascending</FlatButton>
                <FlatButton onPress={() => sortRating("DESC")}>Sort by Rating Descending</FlatButton>
                <FlatButton onPress={clearSort}>Clear Sort</FlatButton>
            </View>
            <FlatList
            persistentScrollbar={true}
            data={data}
            renderItem={renderCard}
            keyExtractor={item => item.isbn13}/> 
            <View style={{flexDirection: 'row', justifyContent:'center', marginTop: 10,}}>
                <Pressable onPress={() => changePage("Last")}>
                <Text style={{marginHorizontal: 15,}}>Last page</Text>
                </Pressable>
                <TextInput style={{borderColor: 'black', borderWidth: 2}}></TextInput>
                <Pressable onPress={() => changePage("Next")}>
                <Text style={{marginHorizontal: 15,}}>Next Page</Text>
                </Pressable>
            </View>
        </View> : null}
        {ctx.manager ?
            <Button title="Homepage" onPress={() => props.navigation.navigate("WelcomeManager")}/>
        :   <Button title="Homepage" onPress={() => props.navigation.navigate("Welcome")}/>
        }
    </View>
   )
}
export default BookList;