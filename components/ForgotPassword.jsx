import React, { Component } from "react";
import { View, TextInput, Button } from "react-native";
import { Text, Icon } from "react-native-elements";
import { firebase } from "../firebase/config";
import styles from "../styles/main";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resetEmail: "",
      isLoading: false,
    };
  }

  sendPasswordResetEmail = () => {
    this.setState({ isLoading: true });

    firebase
      .auth()
      .sendPasswordResetEmail(this.state.resetEmail)
      .then(() => {
        console.log("SENT");
        this.setState({ isLoading: false });
        this.props.navigation.navigate("ForgotPasswordInfo");
      })
      .catch((error) => {
        console.log("ERROR");
        this.setState({ isLoading: false });

        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === "auth/argument-error")
          alert("User is not enabled " + errorMessage);
        if (errorCode === "auth/invalid-email")
          alert("Invalid email: " + errorMessage);
        if (errorCode === "auth/user-not-found")
          alert("User not found " + errorMessage);
        if (errorCode === "auth/user-disabled")
          alert("User is not enabled " + errorMessage);
      });
  };

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={styles.layer2}>
          <View style={styles.signInContainer}>
            <Text style={styles.header}>Forgot Your Password?</Text>

            <View style={styles.signInFormFields}>
              <View style={styles.inputContainer}>
                <Icon
                  name="email-variant"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  placeholder="Email"
                  autoCompleteType="email"
                  autoCapitalize="none"
                  style={styles.input}
                  onChangeText={(value) => this.setState({ resetEmail: value })}
                />
              </View>
            </View>

            <View style={styles.SignInbutton}>
              <Button
                title="Send Reset Email"
                color="#22BF7B"
                onPress={() => this.sendPasswordResetEmail()}
              />
            </View>

            <View style={styles.SignInbutton}>
              <Button
                title="Go Back"
                color="#8b30b5"
                onPress={() => this.props.navigation.navigate("SignIn")}
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

export default ForgotPassword;
