import React, { Component, useEffect } from "react";
import { View, ScrollView, TextInput, Text, Button } from "react-native";
import styles from "../styles/main";
import { firebase } from "../firebase/config";
import { Icon } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      company: "",
      emailSupervisor: "",
      phoneSupervisor: "",
      nameSupervisor: "",
      loading: true,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    var userData = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get();
    this.setState({ user: userData.data() });

    console.log(this.state.user);

    await firebase
      .firestore()
      .collection("company")
      .doc(this.state.user.company)
      .onSnapshot((doc) => {
        console.log(doc.data());
        this.setState({ company: doc.data() });
        this.setState({ nameSupervisor: doc.data().nameSupervisor });
        this.setState({ phoneSupervisor: doc.data().phoneSupervisor });
        this.setState({ emailSupervisor: doc.data().emailSupervisor });
      });

    console.log(this.state.company);
    this.setState({ loading: false });
  }

  updateContact() {
    var text = "";

    if (
      this.state.company.emailSupervisor !== this.state.emailSupervisor ||
      this.state.company.phoneSupervisor !== this.state.phoneSupervisor
    ) {
      firebase
        .firestore()
        .collection("company")
        .doc(this.state.user.company)
        .update({
          emailSupervisor: this.state.emailSupervisor,
          phoneSupervisor: this.state.phoneSupervisor,
        })
        .then(() => {
          console.log("");
        });

      text = " Data Updated ";
    }

    if (text !== "") {
      alert(text);
    } else {
      alert("No changes to update details.");
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.layer2}>
          <View style={styles.signInContainer}>
            <Text style={[styles.header, { textAlign: "center" }]}>
              {this.state.nameSupervisor}
            </Text>
            <View style={{ padding: 20 }}>
              <View style={styles.inputContainerWithBG}>
                <Icon
                  name="cellphone-android"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  placeholder="Phone"
                  value={this.state.phoneSupervisor}
                  style={styles.input}
                  onChangeText={(value) =>
                    this.setState({ phoneSupervisor: value })
                  }
                  autoCompleteType="email"
                />
              </View>
              <View style={styles.inputContainerWithBG}>
                <Icon
                  name="email-variant"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  placeholder="email"
                  value={this.state.emailSupervisor}
                  style={styles.input}
                  onChangeText={(value) =>
                    this.setState({ emailSupervisor: value })
                  }
                  autoCompleteType="email"
                />
              </View>
            </View>

            <View style={styles.SignInbutton}>
              <Button
                title="Update Contact Details"
                color="#22BF7B"
                onPress={() => this.updateContact()}
              />
            </View>
            <View style={styles.SignInbutton}>
              <Button
                title="Back"
                color="#8B30B5"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}

export default Contacts;
