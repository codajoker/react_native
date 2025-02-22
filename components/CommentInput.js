import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AddCommentIcon from "../icons/AddCommentIcon";
import { useSelector } from "react-redux";
import { addPost } from "../utils/firestore";
import { colors } from "../styles/global";

export default function CommentInput({
  inputText,
  handleInputText,
  handleAddComment,
  placeholder,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={[
            styles.text,
            inputText.length > 0 ? styles.fillText : styles.emptyText,
          ]}
          placeholder={placeholder}
          value={inputText}
          onChangeText={(value) => handleInputText(value)}
        ></TextInput>
        <TouchableOpacity onPress={handleAddComment}>
          <View style={styles.publish}>
            <AddCommentIcon />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  publish: {
    right: 0,
  },
  input: {
    width: "100%",
    flexDirection: "row",
    gapap: 4,
    alignItems: "center",
  },
  text: {
    width: "100%",
    fontSize: 16,
    textAlignVertical: "center",
  },
  fillText: {
    color: "#212121",
  },
  emptyText: {
    color: colors.text_gray,
  },
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.border_gray,
    borderRadius: 100,
    backgroundColor: colors.light_gray,
  },
});
