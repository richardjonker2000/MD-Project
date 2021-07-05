import React, { Component, useEffect } from "react";
import {
  Platform,
  View,
  ScrollView,
  TextInput,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/main";
import { Icon } from "react-native-elements";

import * as ImagePicker from "expo-image-picker";
import { firebase } from "../firebase/config";
import { ActivityIndicator } from "react-native-paper";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snapshotUser: {
        name: "",
        phone: "",
        avatar: "",
        email: "",
        id: "",
      },
      avatarURL:
        "https://firebasestorage.googleapis.com/v0/b/md-ipb.appspot.com/o/addPicture.png?alt=media&token=0e9fe6f8-ca49-4143-a19d-ea2924c596a1",
      fullname: "",
      phone: "",
      password: "",
      passwordConfirm: "",
      loading: true,
    };
  }

  fetchUser() {
    this.subscriber = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        this.setState({ snapshotUser: doc.data() });

        if (this.state.snapshotUser.avatar !== "") {
          this.setState({ avatarURL: this.state.snapshotUser.avatar });
        }
        this.setState({ fullname: this.state.snapshotUser.name });
        this.setState({ phone: this.state.snapshotUser.phone });
      });
  }

  componentDidMount() {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    this.setState({ loading: true });

    this.fetchUser();
    this.setState({ loading: false });
  }

  pickImage = async () => {
    //let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.75,
    });

    if (!result.cancelled) {
      this.uploadImage(result.uri, this.state.snapshotUser.id);
    }
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("userProfilePics/" + imageName);
    ref.put(blob);
    var url = await ref.getDownloadURL().then((url) => {
      this.setState({ avatarURL: url });
      firebase
        .firestore()
        .collection("users")
        .doc(this.state.snapshotUser.id)
        .update({
          avatar: this.state.avatarURL,
        })
        .then(() => {
          console.log("User updated!");
        });
    });
  };

  updateProfileChanges() {
    var text = "";
    if (this.state.fullname !== this.state.snapshotUser.name) {
      firebase
        .firestore()
        .collection("users")
        .doc(this.state.snapshotUser.id)
        .update({
          name: this.state.fullname,
        })
        .then(() => {
          console.log("Name updated!");
        });

      text += " - Full Name Updated \n";
    }

    if (this.state.phone !== this.state.snapshotUser.phone) {
      firebase
        .firestore()
        .collection("users")
        .doc(this.state.snapshotUser.id)
        .update({
          phone: this.state.phone,
        })
        .then(() => {
          console.log("phone updated!");
        });

      text += " - Phone Updated \n";
    }

    console.log(this.state.password.length);
    if (this.state.passwordConfirm !== "" || this.state.password !== "") {
      if (
        this.state.password.length >= 8 &&
        this.state.passwordConfirm.length >= 8 &&
        this.state.password == this.state.passwordConfirm
      ) {
        var user = firebase.auth().currentUser;

        user
          .updatePassword(this.state.password)
          .then(function () {})
          .catch(function (error) {
            text += " !! Error updating password. " + error;
          });

        text += " - Password Updated\n";
      } else {
        if (this.state.password !== this.state.passwordConfirm) {
          text += "!! Make sure password and password confirm are same and \n";
        }

        if (this.state.passwordConfirm < 8 || this.state.password < 8) {
          text += "!! Password must be at least 8 characters long.\n";
        }
      }
    }

    if (text !== "") {
      alert(text);
    } else {
      alert("No changes to update user.");
    }
  }

  resetProfileChanges() {
    this.fetchUser();
    this.setState({ password: "" });
    this.setState({ passwordConfirm: "" });
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
          <View>
            <TouchableOpacity onPress={() => this.pickImage()}>
              <Image
                style={styles.profileImg}
                source={{ uri: this.state.avatarURL }}
              />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View style={{ paddingHorizontal: 50 }}>
              <View style={styles.inputContainerWithBG}>
                <Icon
                  name="card-account-details-outline"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  style={styles.input}
                  value={this.state.fullname}
                  onChangeText={(value) => this.setState({ fullname: value })}
                />
              </View>

              <View style={styles.inputContainerWithDarkerBG}>
                <Icon
                  name="email-variant"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <Text style={styles.input}>
                  {this.state.snapshotUser.email}
                </Text>
              </View>

              <View style={styles.inputContainerWithBG}>
                <Icon
                  name="phone"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  style={styles.input}
                  value={this.state.phone}
                  onChangeText={(value) => this.setState({ phone: value })}
                />
              </View>

              <View style={styles.inputContainerWithDarkerBG}>
                <Icon
                  name="laptop-windows"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <Text style={styles.input}>
                  {this.state.snapshotUser.company}
                </Text>
              </View>

              <View style={styles.inputContainerWithBG}>
                <Icon
                  name="form-textbox-password"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  placeholder="New Password"
                  style={styles.input}
                  autoCompleteType="username"
                  onChangeText={(value) => this.setState({ password: value })}
                  secureTextEntry
                />
              </View>

              <View style={styles.inputContainerWithBG}>
                <Icon
                  name="check-all"
                  type="material-community"
                  style={styles.inputBoxIcon}
                />
                <TextInput
                  placeholder="Confirm New Password"
                  style={styles.input}
                  autoCompleteType="username"
                  secureTextEntry
                  onChangeText={(value) =>
                    this.setState({ passwordConfirm: value })
                  }
                />
              </View>

              <View style={styles.SignInbutton}>
                <Button
                  title="Update Profile"
                  color="#22BF7B"
                  onPress={() => this.updateProfileChanges()}
                />
              </View>

              <View style={styles.SignInbutton}>
                <Button
                  title="Reset Changes"
                  color="#000"
                  onPress={() => this.resetProfileChanges()}
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
          </ScrollView>
        </View>
      );
    }
  }
}

export default Profile;
