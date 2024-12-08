import { View, Text, StyleSheet, Alert, TextInput, ScrollView, Dimensions } from "react-native";
import { useState } from "react";
import FlatButton from "../components/FlatButton";
import FormField from "../components/FormField";
import { createUser } from "../components/Authenticate";
import { AuthContext } from "../components/AuthContext";
import { useContext, useEffect } from "react";
import axios from "axios";

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

function RegisterBook(props){

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

    const [isbn10, setIsbn10] = useState("");
    const [isbn13, setIsbn13] = useState("");
    const [title, setTitle] = useState("");
    const [day, setDay] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [numOfPages, setNumOfPages] = useState(-1);
    const [Stock, setStock] = useState(-1);
    const [Price, setPrice] = useState(-1);
    const [inputError, setInputError] = useState("");
    const [multiFields, setMultiFields] = useState(false)
    const [publishers, setPublishers] = useState([])
    const [keywords, setKeywords] = useState([])
    const [languages, setLanguages] = useState([])
    const [authors, setAuthors] = useState([])
    const [genres, setGenres] = useState([])
    const [publisher, setPublisher] = useState("")
    const [keyword, setKeyword] = useState("")
    const [language, setLanguage] = useState("")
    const [author, setAuthor] = useState("")
    const [genre, setGenre] = useState("")


    async function handleSubmit(){
        if(isbn10.length != 10){
            setInputError("ISBN10 ISSUE")
        }
        else if(isbn13.length != 13){
            setInputError("ISBN13 ISSUE")
        }
        else if(title == ""){
            setInputError("TITLE ISSUE")
        }
        else if(day <= 0 || day > 31){
            setInputError("DAY ERROR")
        }
        else if(month <= 0 || month > 12){
            setInputError("MONTH ERROR")
        }
        else if(year > new Date().getFullYear() || year < 1){
            setInputError("YEAR ISSUE")
        }
        else if(numOfPages < 0){
            setInputError("PAGES ISSUE")
        }
        else if(Stock < 0){
            setInputError("STOCK ISSUE")
        }
        else if(Price < 0){
            setInputError("PRICE ISSUE")
        }
        else{
            console.log("Book submission");
            setMultiFields(true)
        }
    }
    async function addBook(){
        const date = year + "-" + month + "-" + day
        console.log(date)
        if(publishers.length == 0 ){
            setInputError("ADD AT LEAST ONE PUBLISHER")
        }else if(genres.length == 0){
            setInputError("ADD AT LEAST ONE GENRE")
        }else if(authors.length == 0){
            setInputError("ADD AT LEAST ONE AUTHOR")
        }else if(keywords.length == 0){
            setInputError("ADD AT LEAST ONE KEYWORD")
        }else if(languages.length == 0){
            setInputError("ADD AT LEAST ONE LANGUAGE")
        }else{
            try{
                const test = await axios.get("http://localhost:8080/editStock", {params: {action: "ADD BOOK",
                    isbn10: isbn10, isbn13: isbn13, title: title, publicationDate: date,
                    numOfPages: numOfPages, Stock: Stock, Price: Price,
                    genres: genres, publishers: publishers, authors: authors,
                    keywords: keywords, languages: languages
                }, paramsSerializer: {
                    indexes: null, // use brackets with indexes
                  }}); 
                console.log(test.data[0][0].customerID)
                console.log(data.data)
            }catch(error){
                setInputError("ADD BOOK ISSUE" + error);
                console.log("UNABLE TO ADD BOOK TRY AGAIN: "+error)
            }
        }
    }

   
//isbn10, isbn13, title, publicationDate, numOfPages, Stock, Price

    return(
        <ScrollView style={[styles.container, {maxHeight: dimensions.window.height - 100}]}>
            <Text>{inputError}</Text>
            {!multiFields ?
            <View>
                <FormField label="isbn10" secure={false} keyboard={"numeric"} capitalize={"words"} textChange={setIsbn10} info={isbn10}/>
                <FormField label="isbn13" secure={false} keyboard={"numeric"} capitalize={"words"} textChange={setIsbn13} info={isbn13}/>
                <FormField label="title" secure={false} capitalize={"words"} textChange={setTitle} info={title}/>
                <FormField label="Day" secure={false} keyboard={"numeric"} capitalize={"words"} textChange={setDay} info={day}/>
                <FormField label="Month" secure={false} keyboard={"numeric"} capitalize={"words"} textChange={setMonth} info={month}/>
                <FormField label="Year" secure={false} keyboard={"numeric"} capitalize={"words"} textChange={setYear} info={year}/>
                <FormField label="numOfPages" secure={false} keyboard={"numeric"} textChange={setNumOfPages} info={numOfPages}/>
                <FormField label="Stock" secure={false} keyboard={"numeric"} textChange={setStock} info={Stock}/>
                <FormField label="Price" secure={false} keyboard={"decimal"} textChange={setPrice} info={Price}/>
                <FlatButton onPress={handleSubmit}>Register</FlatButton>
            </View>
            :
            <View>
                <FormField label="Publisher" secure={false} keyboard={"numeric"} capitalize={"words"} textChange={setPublisher} info={publisher}/>
                <FlatButton onPress={()=> {if(publisher.length != 0) {publishers.push(publisher); setPublisher("");}}}>Add Publisher</FlatButton>
                <FormField label="Genre" secure={false} keyboard={"numeric"} capitalize={"words"} textChange={setGenre} info={genre}/>
                <FlatButton onPress={()=> {if(genre.length != 0) {genres.push(genre); setGenre("");}}}>Add Genre</FlatButton>
                <FormField label="Author" secure={false} capitalize={"words"} textChange={setAuthor} info={author}/>
                <FlatButton onPress={()=> {if(author.length != 0) {authors.push(author); setAuthor("");}}}>Add Author</FlatButton>
                <FormField label="Keyword" secure={false} keyboard={"numeric"} capitalize={"words"} textChange={setKeyword} info={keyword}/>
                <FlatButton onPress={()=> {if(keyword.length != 0) {keywords.push(keyword); setKeyword("");}}}>Add Keyword</FlatButton>
                <FormField label="Language" secure={false} keyboard={"numeric"} capitalize={"words"} textChange={setLanguage} info={language}/>
                <FlatButton onPress={()=> {if(language.length != 0) {languages.push(language); setLanguage("");}}}>Add Language</FlatButton>
                <FlatButton onPress={addBook}>Register Book</FlatButton>
            </View>}
        </ScrollView>);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff6300',
        padding: 10,
        borderRadius:25,
        margin:15,
    },
    textInputFields: {
        borderWidth: 2,
        borderColor: "black",
    },
    button :{
        width: 100,
    },
    createAccountText:{
        textAlign: "center",
    },
});

export default RegisterBook;