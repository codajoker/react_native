import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../styles/global";

export default function PostFormInput({ value, onChange, placeholder }) {
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={[styles.text, value.length > 0 ? styles.filled : styles.empty]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: colors.border_gray,
  },
  text: {
    fontSize: 16,
    paddingVertical: 16,
  },
  filled: {
    color: "#212121",
  },
  empty: {
    color: "#BDBDBD",
  },
});
