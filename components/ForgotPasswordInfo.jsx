import React, { Component } from "react";
import { View, TextInput, Button } from "react-native";
import { Text, Icon } from "react-native-elements";
import styles from "../styles/main";

class ForgotPasswordInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resetEmail: "",
      isLoading: false,
    };
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={styles.layer2}>
          <View style={styles.signInContainer}>
            <Text style={styles.header}>Check Email</Text>
            <Text style={styles.headerTwo}>
              Follow the instructions on the email and click the button below to
              sign in with new password.
            </Text>

            <View style={styles.signInFormFields}></View>

            <View style={styles.SignInbutton}>
              <Button
                title="Sign In Now"
                color="#22BF7B"
                onPress={() => this.props.navigation.navigate("SignIn")}
              />
            </View>
            <View style={styles.SignInbutton}>
              <Button
                title="Send Email Again"
                color="#000"
                onPress={() => this.props.navigation.navigate("ForgotPassword")}
              />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.layer2}>
          <Text style={styles.header}>Loading</Text>
        </View>
      );
    }
  }
}

export default ForgotPasswordInfo;
