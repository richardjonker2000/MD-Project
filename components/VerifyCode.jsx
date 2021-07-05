import React, { Component } from "react";
import { View, TextInput, Button } from "react-native";
import { Text, Icon } from "react-native-elements";
import { firebase } from "../firebase/config";
import styles from "../styles/main";

class VerifyCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verifyCode: 0,
      isLoading: false,
      verified: false,
      emailSent: false,
      sentCode: 0,
      user: props.route.params.user,
    };
  }

  componentDidMount() {
    this.sendVerificationEmail();
  }

  sendVerificationEmail = async () => {
    await this.setState({ sentCode: Math.floor(1000 + Math.random() * 9000) });
    console.log(this.state.sentCode);

    var resonseFromFunctions = firebase
      .functions()
      .httpsCallable("sendMail")({
        dest: this.state.user.email,
        code: this.state.sentCode,
      })
      .then((response) => {
        this.setState({ emailSent: true });
      })
      .catch((response) => {
        console.log(response);
      });
  };

  verifyCode = () => {
    if (this.state.verifyCode == this.state.sentCode) {
      this.state.verified = true;
      // update the DB
      alert("User verified successfully");
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          isVerified: true,
        })
        .then(() => {
          console.log("User Verified");
        });
      this.props.navigation.reset({
        index: 0,
        routes: [
          {
            name: "App",
            params: { user: this.state.user },
          },
        ],
      });
    } else {
      alert("Verification code didn't match.");
    }
  };

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={styles.layer2}>
          <View style={styles.signInContainer}>
            <Text style={styles.header}>Verify Email</Text>
            <Text style={styles.headerTwo}>
              We need to verify your email before completing the sign in
              process.
            </Text>

            <View style={styles.SignInbutton}>
              <Button
                title="Resend Verification Code by Email"
                color="#8b30b5"
                onPress={() => this.sendVerificationEmail()}
              />
            </View>

            <View style={styles.signInFormFields}>
              <View style={styles.inputContainer}>
                <Icon
                  name="confirmation-number"
                  type="material"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  placeholder="4 Digit Verification Code"
                  autoCapitalize="none"
                  editable={this.state.emailSent}
                  style={styles.input}
                  onChangeText={(value) => this.setState({ verifyCode: value })}
                />
              </View>
            </View>

            <View style={styles.SignInbutton}>
              <Button
                title="Submit Code"
                color="#22BF7B"
                onPress={() => this.verifyCode()}
                disabled={!this.state.emailSent}
              />
            </View>

            <View style={styles.SignInbutton}>
              <Button
                title="Go Back"
                color="#8b30b5"
                onPress={() => this.props.navigation.goBack()}
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

export default VerifyCode;
