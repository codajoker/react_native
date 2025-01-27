import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CirclePlusSvg from "../icons/CirclePlusSvg";
import Input from "../components/Input";
import { useState } from "react";
import { colors } from "../styles/global";
import Button from "../components/Button";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export default function RegistrationScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const handleEmail = (value) => {
    setEmail(value);
  };
  const handlePassword = (value) => {
    setPassword(value);
  };
  const handleLogin = (value) => {
    setLogin(value);
  };
  const handleIsPasswordVisible = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const rightButton = (
    <TouchableOpacity
      style={styles.rightButton}
      onPress={handleIsPasswordVisible}
    >
      <Text style={styles.rightButtonText}>Показати</Text>
    </TouchableOpacity>
  );

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <>
        <Image
          style={styles.imageBackground}
          source={require("../assets/bg.png")}
          resizeMode="cover"
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.formContainer}>
            <View style={styles.profile}>
              <View style={styles.profileImage}></View>
              <CirclePlusSvg style={styles.addSvg} />
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={[styles.inputContainer, styles.innerContainer]}>
              <Input
                value={login}
                placeholder="Логін"
                onTextChange={handleLogin}
              ></Input>
              <Input
                value={email}
                placeholder="Адреса електронної пошти"
                onTextChange={handleEmail}
              ></Input>
              <Input
                value={password}
                placeholder="Пароль"
                onTextChange={handlePassword}
                secureTextEntry={isPasswordVisible}
                rightButton={rightButton}
                outerStyles={styles.inputPassword}
              ></Input>
            </View>
            <Button buttonStyle={styles.button}>
              <Text style={styles.buttonText}>Зареєструватися</Text>
            </Button>
            <View style={styles.loginContainer}>
              <Text style={[styles.baseText, styles.passwordButtonText]}>
                Вже є акаунт?{" "}
                <TouchableWithoutFeedback>
                  <Text style={styles.signUpText}> Увійти</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
          {/* <Text>RegistrationScreen</Text> */}
        </KeyboardAvoidingView>
      </>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  imageBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",

    bottom: "0",
  },
  addSvg: {
    position: "absolute",
    bottom: 10,
    right: -14,
  },
  innerContainer: {
    marginBottom: 43,
  },
  formContainer: {
    width: SCREEN_WIDTH,
    height: "65%",
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    position: "relative",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: colors.black_primary,
    marginBottom: 32,
  },
  inputContainer: {
    gap: 16,
  },
  inputPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rightButtonText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    color: "#1B4371",
  },
  button: {
    marginBottom: 16,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 18,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  profileImage: {
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: colors.light_gray,
  },
  profile: {
    alignItems: "center",
    position: "absolute",
    left: "38%",
    top: -60,
  },
});
