import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DefaultImage from "../assets/default.jpg";
import CommentIcon from "../icons/CommentIcon";
import GeoMarkerIcon from "../icons/GeoMarkerIcon";
import LikeIcon from "../icons/LikeIcon";

export default function PostCard({
  id,
  image = DefaultImage,
  name,
  comments = [],
  likes = 0,
  location = { name: "N/A", lat: 0, lon: 0 },
  isProfile = true,
}) {
  const navigation = useNavigation();

  const navigateToComments = () => {
    navigation.navigate("Comments", {
      postId: id,
    });
  };

  const navigateToMap = () => {
    navigation.navigate("Map", {
      name,
      location,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.info}>
        <View style={styles.statistics}>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.iconWrapper}
              onPress={navigateToComments}
            >
              <CommentIcon />
            </TouchableOpacity>
            <Text style={styles.value}>{comments.length}</Text>
          </View>
          {isProfile && (
            <View style={styles.item}>
              <View style={styles.iconWrapper}>
                <LikeIcon />
              </View>
              <Text style={styles.value}>{likes}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.location} onPress={navigateToMap}>
          <View style={styles.iconWrapper}>
            <GeoMarkerIcon />
          </View>
          <Text style={{ ...styles.value, textDecorationLine: "underline" }}>
            {location.name}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
  },
  statistics: {
    flexDirection: "row",
    columnGap: 24,
  },
  item: {
    flexDirection: "row",
    columnGap: 8,
  },
  iconWrapper: {
    width: 24,
    height: 24,
  },
  value: {
    fontSize: 16,
  },
  location: {
    flexDirection: "row",
    columnGap: 8,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
});
