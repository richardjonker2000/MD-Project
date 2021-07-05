import React, { Component } from "react";
import { View, TextInput, Text, Button } from "react-native";
import styles from "../styles/main";
import { Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { firebase } from "../firebase/config";

const companies = firebase.firestore().collection("company");

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      name: "",
      phone: "",
      company: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarURL: "",
      companies: [],
    };
  }

  componentDidMount() {
    var companiesL = firebase.firestore().collection("company");
    //console.log(companiesL);
    companiesL.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      //console.log(items);
      this.setState({ companies: items });
    });
  }

  // Update state key with value
  setStateFor = (key, val) => {
    this.setState({
      [key]: val,
    });
  };

  onRegisterPress = () => {
    this.setStateFor("isLoading", true);
    if (
      this.state.fullName == "" ||
      this.state.email == "" ||
      this.state.phone == "" ||
      this.state.password == "" ||
      this.state.passwordConfirm == "" ||
      this.state.company == ""
    ) {
      this.setStateFor("isLoading", false);
      alert("Please fill in all the fields");
      return;
    }

    if (this.state.password !== this.state.passwordConfirm) {
      this.setStateFor("isLoading", false);
      alert("Passwords don't match.");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((resp) => {
        // if (resp.additionalUserInfo.isNewUser) alert("New user");
        // store image to firebase storage
        //this.uploadImage(this.state.avatarLocalPath, resp.user.uid);

        const uid = resp.user.uid;
        const data = {
          id: uid,
          phone: this.state.phone,
          email: this.state.email,
          name: this.state.name,
          company: this.state.company,
          avatar: this.state.avatarURL,
          isVerified: false,
        };

        console.log(this.state.avatarURL);
        console.log(data.avatar);
        // FIRESTORE - Persistent server side
        // firebase.firestore() return a Firestore object
        // collection(path) - returns a CollectionReference associated to path
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid) // Gets the document reference associated to uid
          .set(data) // Add/Create data to the document reference
          .then(() => {
            // Set return a promise without parameter's
            // maybe send to verification page and then from there to success screen and then to login page
            alert("User Registered Successfully");
            this.setStateFor("isLoading", false);

            this.props.navigation.navigate("VerifyCode", { user: data });
          })
          .catch((error) => {
            this.setStateFor("isLoading", false);

            alert(error);
          });
      })
      .catch((error) => {
        this.setStateFor("isLoading", false);

        let errorCode = error.code;
        let errorMessage = error.message;
        if (error.code == "auth/operation-not-allowed")
          alert("Registry with email and password is not enabled");
        if (error.code == "auth/weak-password") alert("Password is too weak");
        if (error.code == "auth/invalid-email") alert("Invalid email");
        if (error.code == "auth/email-already-in-use")
          alert("Email already in use");
      });
  };

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={styles.layer2}>
          <View style={styles.signInContainer}>
            {/* <Image source={require("../assets/logo.png")} style={styles.logo} /> */}
            <Text style={styles.header}>Register</Text>

            <View style={styles.signInFormFields}>
              <View style={styles.inputContainer}>
                <Icon
                  name="card-account-details-outline"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  placeholder="Full Name"
                  style={styles.input}
                  autoCompleteType="name"
                  onChangeText={(value) => this.setStateFor("name", value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon
                  name="phone"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  placeholder="Phone Number"
                  style={styles.input}
                  keyboardType="numeric"
                  autoCompleteType="tel"
                  onChangeText={(value) => this.setStateFor("phone", value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon
                  name="email-variant"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  placeholder="E-mail"
                  style={styles.input}
                  autoCompleteType="email"
                  onChangeText={(value) => this.setStateFor("email", value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon
                  name="form-textbox-password"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  onChangeText={(value) => this.setStateFor("password", value)}
                  secureTextEntry
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon
                  name="check-all"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  placeholder="Confirm Password"
                  style={styles.input}
                  onChangeText={(value) =>
                    this.setStateFor("passwordConfirm", value)
                  }
                  secureTextEntry
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon
                  name="laptop-windows"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <View style={styles.dropwdownInput}>
                  <Picker
                    style={styles.input}
                    prompt="Select Company"
                    selectedValue={this.state.company}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setStateFor("company", itemValue)
                    }
                  >
                    <Picker.Item label="Select company..." value="" />
                    {this.state.companies.map((doc) => {
                      //console.log(doc.name);
                      //console.log(doc.id);
                      return (
                        <Picker.Item
                          label={doc.name}
                          value={doc.id}
                          key={doc.id}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>

            <Text>{}</Text>

            <View style={styles.SignInbutton}>
              <Button
                title="Register"
                color="#22BF7B"
                onPress={this.onRegisterPress}
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

export default Register;
