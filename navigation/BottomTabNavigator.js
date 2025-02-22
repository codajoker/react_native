import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { colors } from "../styles/global";

import PostsScreen from "../screens/PostsScreen";
import CreatePostScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LogoutButton from "../components/ui/LogoutButton";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={({ navigation }) => ({
        tabBarLabel: "label",
        tabBarStyle: {
          display: "flex",
          paddingHorizontal: 50,
          paddingTop: 12,
          paddingBottom: 12,
        },
      })}
    >
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: "PostsScreen",
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#212121",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="grid-outline"
              size={24}
              color={colors.bottom_icons}
            />
          ),
        })}
      />

      <Tab.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={({ navigation }) => ({
          title: "CreatePostScreen",
          tabBarShowLabel: false,
          tabBarItemStyle: style.addButton,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="add-outline" size={24} color={colors.white} />
          ),
        })}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "ProfileScreen",
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#212121",
          headerRightContainerStyle: { paddingRight: 8 },
          headerRight: () => (
            <LogoutButton onPress={() => console.log("log out")} />
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={colors.bottom_icons}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const style = StyleSheet.create({
  addButton: {
    backgroundColor: "orange",
    borderRadius: 20,
    height: 40,
  },
});
