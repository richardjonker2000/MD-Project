import React, { Component, useContext } from "react";
import { View, ScrollView, TextInput, Text, Button } from "react-native";
import styles from "../styles/main";
import { Icon } from "react-native-elements";
import { firebase } from "../firebase/config";
import { AuthContext } from "../context/AuthContext"; // Import Context
import { ActivityIndicator } from "react-native-paper";

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      details: { phone: "", email: "", nif: "", address: "" },
      phone: "",
      email: "",
      nif: "",
      address: "",
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
        this.setState({ details: doc.data() });

        this.setState({ phone: doc.data().phone });
        this.setState({ email: doc.data().email });
        this.setState({ nif: doc.data().nif });
        this.setState({ address: doc.data().address });
      });

    console.log(this.state.details);
    this.setState({ loading: false });
  }

  updateDetails() {
    var text = "";

    if (
      this.state.details.phone !== this.state.phone ||
      this.state.details.email !== this.state.email ||
      this.state.details.nif !== this.state.nif ||
      this.state.details.address !== this.state.address
    ) {
      firebase
        .firestore()
        .collection("company")
        .doc(this.state.user.company)
        .update({
          phone: this.state.phone,
          email: this.state.email,
          nif: this.state.nif,
          address: this.state.address,
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
            <Text style={styles.header}>Billing Information</Text>

            <View>
              <View style={styles.inputContainerWithBG}>
                <Icon
                  name="email-variant"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  placeholder="email"
                  value={this.state.email}
                  style={styles.input}
                  onChangeText={(value) => this.setState({ email: value })}
                />
              </View>

              <View style={styles.inputContainerWithBG}>
                <Icon
                  name="phone"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />

                <TextInput
                  placeholder="Phone number"
                  value={this.state.phone}
                  style={styles.input}
                  onChangeText={(value) => this.setState({ phone: value })}
                />
              </View>

              <View style={styles.inputContainerWithBG}>
                <Icon
                  name="home-city"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  placeholder="Address"
                  value={this.state.address}
                  style={styles.input}
                  onChangeText={(value) => this.setState({ address: value })}
                />
              </View>

              <View style={styles.inputContainerWithBG}>
                <Icon
                  name="card-bulleted"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  placeholder="NIF Number"
                  value={this.state.nif}
                  style={styles.input}
                  onChangeText={(value) => this.setState({ nif: value })}
                />
              </View>

              <View style={styles.SignInbutton}>
                <Button
                  title="Update Details"
                  color="#22BF7B"
                  onPress={() => this.updateDetails()}
                />
              </View>
              <View style={styles.SignInbutton}>
                <Button
                  title="Go Back"
                  color="#8B30B5"
                  onPress={() => this.props.navigation.goBack()}
                />
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}

export default Detail;
