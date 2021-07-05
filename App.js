import "react-native-gesture-handler";
import React, { Component } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles/main.js";

// Custom Components
import OrdersComponent from "./components/Orders";
import OrderComponent from "./components/Order";
import OrdersHistoryComponent from "./components/OrdersHistory";
import DetailComponent from "./components/Detail";
import HomeComponent from "./components/Home";
import ProfileComponent from "./components/Profile";
import ContactsComponent from "./components/Contacts";
import SignInComponent from "./components/SignIn";
import LogOutComponent from "./components/LogOut";
import ChatComponent from "./components/Chat";
import RegisterComponent from "./components/Register";
import ForgotPasswordComponent from "./components/ForgotPassword";
import ForgotPasswordInfoComponent from "./components/ForgotPasswordInfo";
import VerifyCodeComponent from "./components/VerifyCode";
import { AuthContext } from "./context/AuthContext"; // Import Context

//firebase
import { firebase } from "./firebase/config";

//storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//Screen Methods

function HomeScreen({ navigation }) {
  return <HomeComponent navigation={navigation} />;
}

function OrdersScreen({ navigation, route }) {
  return <OrdersComponent navigation={navigation} route={route} />;
}

function OrderScreen({ navigation, route }) {
  return <OrderComponent navigation={navigation} route={route} />;
}

function OrdersHistoryScreen({ navigation, route }) {
  return <OrdersHistoryComponent navigation={navigation} route={route} />;
}

function DetailScreen({ navigation, route }) {
  return <DetailComponent navigation={navigation} route={route} />;
}

function ProfileScreen({ navigation }) {
  return <ProfileComponent navigation={navigation} />;
}

function ContactsScreen({ navigation }) {
  return <ContactsComponent navigation={navigation} />;
}

function SignInScreen({ navigation }) {
  return <SignInComponent navigation={navigation} />;
}

function RegisterScreen({ navigation }) {
  return <RegisterComponent navigation={navigation} />;
}

function ChatScreen({ navigation }) {
  return <ChatComponent navigation={navigation} />;
}

function LogOutScreen({ navigation }) {
  return <LogOutComponent navigation={navigation} />;
}

function ForgotPasswordScreen({ navigation }) {
  return <ForgotPasswordComponent navigation={navigation} />;
}

function ForgotPasswordInfoScreen({ navigation }) {
  return <ForgotPasswordInfoComponent navigation={navigation} />;
}
function VerifyCodeScreen({ navigation, route }) {
  return <VerifyCodeComponent navigation={navigation} route={route} />;
}

// Blog Stack Navigation
const StackAuth = createStackNavigator();

function NavAuth(logged) {
  return (
    <StackAuth.Navigator
      initialRouteName={logged ? "App" : "SignIn"} // Set Initial screen
      headerMode="none" // Hide top nav bar
      screenOptions={{
        headerStyle: styles.headerBG,
        headerTintColor: "#0D1B1E",
        headerTitleStyle: styles.headerBold,
      }}
    >
      <StackAuth.Screen name="SignIn" component={SignInScreen} />
      <StackAuth.Screen name="Register" component={RegisterScreen} />
      <StackAuth.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <StackAuth.Screen
        name="ForgotPasswordInfo"
        component={ForgotPasswordInfoScreen}
      />

      <StackAuth.Screen name="VerifyCode" component={VerifyCodeScreen} />

      <StackAuth.Screen name="App" component={NavTab} />
    </StackAuth.Navigator>
  );
}

// App Tab Navigation
const Tab = createBottomTabNavigator();
function NavTab(props) {
  try {
    const value = AsyncStorage.getItem("userUid").then((value) => {
      console.log("VALUE " + value);
      if (value !== null) {
        firebase
          .firestore()
          .collection("users")
          .doc(value)
          .get()
          .then((documentSnapshot) => {
            console.log("User exists: ", documentSnapshot.exists);

            if (documentSnapshot.exists) {
              console.log("User data: ", documentSnapshot.data());
              console.log(firebase.auth().currentUser);
            } else {
              AsyncStorage.removeItem("userUid");
            }
          });
      }
    });

    var user = value;

    console.log("USER EMAIL " + user.email);
  } catch (e) {
    console.log(e);
  }

  console.log("USER : " + user);

  return (
    <AuthContext.Provider value={user}>
      <Tab.Navigator
        headerMode="none"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Detail") {
              iconName = "md-time-outline";
            } else if (route.name === "Profile") {
              iconName = "ios-person";
            } else if (route.name === "Orders") {
              iconName = "md-list";
            } else if (route.name === "Contacts") {
              iconName = "md-list";
            } else if (route.name === "Chat") {
              iconName = "chatbox";
            } else if (route.name === "Logout") {
              iconName = "md-log-out";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#22BF7B",
          inactiveTintColor: "#818F9C",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Orders" component={NavOrder} />
        <Tab.Screen name="Detail" component={DetailScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Contacts" component={ContactsScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Logout" component={LogOutScreen} />
      </Tab.Navigator>
    </AuthContext.Provider>
  );
}

// Blog Stack Navigation
const Stack = createStackNavigator();
function NavOrder() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerBG,
        headerTintColor: "#FFF7F8",
        headerTitleStyle: styles.headerBold,
      }}
    >
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ title: "Orders", headerShown: false }}
      />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen
        name="OrdersHistory"
        component={OrdersHistoryScreen}
        options={{ title: "Orders History" }}
      />
    </Stack.Navigator>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      userUid: null,
      loading: true,
    };
  }

  onAuthStateChanged = async (user) => {
    console.log("USER THINGY:" + user);

    if (user == null) {
      this.setState({ userUid: null });
      this.setState({ isLogged: false });
      await AsyncStorage.removeItem("userUid");
      console.log("NOT LOGGED IN");
    } else {
      this.setState({ userUid: user.uid });
      this.setState({ isLogged: true });
      console.log("LOGGED IN " + user.uid);

      await this.storeData("userUid", this.state.userUid).then(
        console.log("Stored UID : " + this.state.userUid)
      );
    }

    console.log("State changed USER UID value : " + this.state.userUid);
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const subscriber = await firebase
      .auth()
      .onAuthStateChanged(await this.onAuthStateChanged);

    var uid = await this._getData();
    console.log("UID THING " + uid);
    console.log("IS LOGGED VALUE " + this.state.isLogged);

    this.setState({ loading: false });

    return subscriber; // unsubscribe on unmount
  }

  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  async _getData() {
    try {
      const value = await AsyncStorage.getItem("userUid");
      console.log("VALUE  " + value);

      if (value !== null) {
        console.log("GOT " + value);
        console.log("FIREBASE CURRENT USER : " + firebase.auth().currentUser);
        console.log("Setting Logged in state to true");
        this.setState({ isLogged: true });
        return value;
      } else {
        console.log("Setting Logged in state to false");
        this.setState({ isLogged: false });
      }

      console.log("VALUE OUTTT " + value);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <NavigationContainer style={styles.mainContainer}>
          {NavAuth(this.state.isLogged)}
        </NavigationContainer>
      );
    }
  }
}
App.contextType = AuthContext;

export default App;
