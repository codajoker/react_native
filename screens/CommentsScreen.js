import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DefaultImage from "../assets/default.jpg";
import CommentInput from "../components/CommentInput";
import { useState } from "react";
import { addCommentToDB } from "../utils/firestore";
import { colors } from "../styles/global";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { postId } = route?.params;

  const handleAddComment = async () => {
    setComment("");
    setComments([...comments, comment]);
    await addCommentToDB(postId, comments);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          style={{ ...styles.image, borderWidth: 0 }}
          source={DefaultImage}
        ></Image>
        <FlatList
          style={styles.postsList}
          data={comments}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text>{item}</Text>
            </View>
          )}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        />

        <CommentInput
          inputText={comment}
          handleInputText={setComment}
          handleAddComment={handleAddComment}
          placeholder={"Комментувати..."}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "center",
    rowGap: 32,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  comment: {
    padding: 16,
    textAlignVertical: "center",
    textAlign: "center",
    width: "100%",
    backgroundColor: colors.light_gray,
    borderRadius: 5,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 240,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.border_gray,
  },
});

export default CommentsScreen;
