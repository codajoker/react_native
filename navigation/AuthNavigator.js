import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login Screen",
          headerRightContainerStyle: { paddingRight: 8 },
        }}
      />
      <Stack.Screen
        name="Signup"
        component={RegistrationScreen}
        options={{
          title: "Signup Screen",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
