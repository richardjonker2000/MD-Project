import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Animated, Image } from "react-native";

import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImg: {
    height: 50,
    width: 350,
  },

  topContainer: {
    flex: 4,
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 6,
    backgroundColor: "#A9F0D1",
    alignItems: "center",
  },
  footerContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "#8B30B5",
    alignItems: "center",
  },
  aboutMe: {
    fontWeight: "bold",
    fontSize: 25,
    padding: "5%",
  },
  aboutMeText: {
    textAlign: "justify",
    padding: "5%",
  },
  aboutMeTextBOLD: {
    textAlign: "justify",
    padding: "5%",
    fontWeight: "bold",
  },
  boldWhiteText: {
    fontWeight: "bold",
    color: "#fff",
  },
});

const Home = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
  const [moveAnim, setMoveAnim] = useState(new Animated.Value(100));
  const user = useContext(AuthContext);

  const anim = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(moveAnim, {
        toValue: 0,
        velocity: 1,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    setLoading(false);
    console.log(user);
    anim();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/md-ipb.appspot.com/o/logo.png?alt=media&token=c1f9f0d4-f1b7-48db-a318-5ed303bf45e2",
              }}
              style={styles.profileImg}
            />
          </View>

          <View style={styles.bottomContainer}>
            <Animated.Text h1 style={[styles.aboutMe, { opacity: fadeAnim }]}>
              About the App
            </Animated.Text>
            <Animated.Text style={[styles.aboutMeText, { opacity: fadeAnim }]}>
              This applications was created as a project for Multiplatform
              Development Subject in Informatics Engineering Final Year. Our
              goal was to create a simple order management app for managing the
              orders by a legal representative of an company in a marketplace.
            </Animated.Text>

            <Animated.Text
              style={[styles.aboutMeTextBOLD, { opacity: fadeAnim }]}
            >
              Students Involved : {"\n\n"} - Richard Jonker (a40527) {"\n"} -
              Roshan Poudel (a40529)
              {"\n"} - Milton Correa (a37912)
            </Animated.Text>
          </View>

          <View style={styles.footerContainer}>
            <Animated.Text
              style={[
                styles.boldWhiteText,
                { transform: [{ translateY: moveAnim }] },
              ]}
            >
              If you have any problems, Please report to
            </Animated.Text>
            <Animated.Text
              style={[
                styles.boldWhiteText,
                { transform: [{ translateY: moveAnim }] },
              ]}
            >
              noreply.noteisme@gmail.com
            </Animated.Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;
