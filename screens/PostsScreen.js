import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import UserAvatar from "../assets/keira-knightley.jpg";
import PostCard from "../components/PostCard";
import { colors } from "../styles/global";
import { useSelector } from "react-redux";
import { fetchAllPosts } from "../utils/firestore";

const PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const { displayName, email } = useSelector((state) => state.user.userData);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const result = await fetchAllPosts();

        setPosts(result);
      } catch (error) {
        console.error(error);
      }
    };

    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image style={styles.userImage} source={UserAvatar} />
        <View>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        style={styles.postsList}
        data={posts}
        renderItem={({ item }) => (
          <PostCard {...item} isProfile={false} key={item.id} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userName: {
    fontSize: 13,
    color: colors.black_primary,
  },
  userEmail: {
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postsList: {
    marginBottom: 32,
  },
});

export default PostsScreen;
