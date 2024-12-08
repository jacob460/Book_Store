import { TextInput, View, Text, StyleSheet } from "react-native-web";

function FormField(props){

    return(
    <View style={styles.container}>
        <Text>{props.label}</Text>
        <TextInput style={[styles.textInputFields]} 
        onChangeText={props.textChange}
        secureTextEntry={props.secure}
        inputMode={props.keyboard}
        autoCapitalize={props.capitalize}
        value={props.info}
        ></TextInput>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputFields: {
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "grey",
        marginVertical: 8,
        width: 300,
    },
    errorInput:{
        borderColor: "red",
    },

});

export default FormField;