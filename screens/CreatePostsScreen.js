import { useRef, useState, useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import Button from "../components/ui/Button";
import PostFormInput from "../components/ui/PostFormInput";
import CameraIcon from "../icons/CameraIcon";
import TrashIcon from "../icons/TrashIcon";
import DefaultImage from "../assets/default.jpg";
import { colors } from "../styles/global";

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const [postImage, setPostImage] = useState("");
  const [postName, setPostName] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [location, setLocation] = useState(null);
  const [permissionCamera, requestCameraPermission] = useCameraPermissions();
  const [_, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef();

  useEffect(() => {
    async function requestLocationPermission() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    }
    requestLocationPermission();
  }, []);

  const requestPermission = async () => {
    await requestCameraPermission();
    await requestMediaLibraryPermission();
  };

  const takePicture = async () => {
    if (!cameraRef) {
      return;
    }
    const { uri } = await cameraRef.current.takePictureAsync();
    await MediaLibrary.saveToLibraryAsync(uri);
    setPostImage(uri);

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const editPicture = () => {
    setPostImage("");
  };

  const handleSubmit = () => {
    setPostImage("");
    setPostName("");
    setPostLocation("");
    navigation.navigate("Home", {
      screen: "PostsScreen",
      params: {
        newPost: {
          id: `${Date.now()}`,
          image: postImage,
          name: postName,
          comments: [],
          likes: 0,
          location: {
            name: postLocation,
            lat: location?.coords?.latitude,
            lon: location?.coords?.longitude,
          },
        },
      },
    });
  };

  if (!permissionCamera) {
    return <View />;
  }

  if (!permissionCamera.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.iamgeArea}>
          <View style={styles.imageWrapper}>
            {postImage ? (
              <Image
                style={styles.image}
                source={postImage || DefaultImage}
              ></Image>
            ) : (
              <CameraView style={styles.camera} facing="back" ref={cameraRef}>
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={takePicture}
                >
                  <CameraIcon />
                </TouchableOpacity>
              </CameraView>
            )}
          </View>
          <Text style={styles.imageName} onPress={editPicture}>
            {postImage ? "Редагувати фото" : "Завантажте фото"}
          </Text>
        </View>
        <View style={styles.inputArea}>
          <PostFormInput
            value={postName}
            onChange={setPostName}
            placeholder="Назва..."
          />
          <PostFormInput
            value={postLocation}
            onChange={setPostLocation}
            placeholder="Місцевість..."
          />
        </View>
        <Button style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Опубліковаввти</Text>
        </Button>
        <TouchableOpacity style={styles.deleteButton}>
          <TrashIcon />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  postArea: {
    gap: 32,
  },
  imageWrapper: {
    position: "relative",
    marginBottom: 8,
    height: 240,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cameraButton: {
    width: 60,
    height: 60,
    padding: 18,
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  imageName: {
    color: colors.text_gray,
    fontSize: 16,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  inputArea: {
    rowGap: 16,
  },
  deleteButton: {
    marginTop: "auto",
    marginHorizontal: "auto",
  },
  buttonText: {
    textAlign: "center",
    color: colors.white,
  },
  camera: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostScreen;
