import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import LogoutButton from "../components/ui/LogoutButton";

const Stack = createStackNavigator();

const AuthNavigator = ({ setIsLoggedIn }) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Login"
        component={() => <LoginScreen setIsLoggedIn={setIsLoggedIn} />}
        options={{
          title: "First Screen",
          headerRightContainerStyle: { paddingRight: 8 },
          headerRight: () => <LogoutButton />,
          setIsLoggedIn: setIsLoggedIn,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={RegistrationScreen}
        options={{
          title: "Second Screen",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
