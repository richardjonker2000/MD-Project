import React, { Component } from "react";
import { View, Button } from "react-native";
import styles from "../styles/main";
import { Text } from "react-native-elements";
import { firebase } from "../firebase/config";
import { AuthContext, user } from "../context/AuthContext"; // Import Context
import AsyncStorage from "@react-native-async-storage/async-storage";

class LogOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      isSigningOut: false,
    };
  }

  async logOut() {
    this.state.isSigningOut = true;
    console.log("Logging Out");
    firebase.auth().signOut();
    await AsyncStorage.removeItem("userUid");

    this.state.isSigningOut = false;

    this.setState({ user: "" });

    <AuthContext.Consumer>{({ user }) => (user = "")}</AuthContext.Consumer>;

    this.props.navigation.reset({
      index: 0,
      routes: [
        {
          name: "SignIn",
        },
      ],
    });
  }

  render() {
    if (!this.state.isSigningOut) {
      return (
        <View style={styles.logOutTopContainer}>
          <Text h3 style={{ paddingVertical: 25 }}>
            Are you sure to logout?
          </Text>
          <View style={styles.logOutContainer}>
            <View style={styles.logOutButtonContainer}>
              <Button
                title="Log Out"
                color="#000"
                onPress={() => this.logOut()}
              />
            </View>
            <View style={styles.logOutButtonContainer}>
              <Button
                title="Go Back"
                color="#8B30B5"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.layer2}>
          <Text style={styles.header}>Signing Out ...</Text>
        </View>
      );
    }
  }
}

export default LogOut;
