import { Pressable, StyleSheet, Text, View } from 'react-native';

function FlatButton({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <View style={{marginTop: 7, marginBottom: 7}}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 8,
    backgroundColor: "#d0eeff",
    borderWidth: 1,
    borderColor: "#000000"
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
