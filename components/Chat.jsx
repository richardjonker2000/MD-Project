import React, { useState, useCallback, useEffect } from "react";
import ThemedListItem from "react-native-elements/dist/list/ListItem";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { firebase } from "../firebase/config";

export default function chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(messages);

    var msgs = firebase
      .firestore()
      .collection("users/" + firebase.auth().currentUser.uid + "/Chat");
    console.log(msgs);
    msgs.onSnapshot((querySnapshot) => {
      const items = [];

      querySnapshot.forEach((doc) => {
        var temp = doc.data();
        temp["id"] = doc.id;

        var message = {
          _id: temp.id,
          text: temp.text,
          createdAt: new Date(temp.time.seconds * 1000),
          user: {
            _id: temp.user,
            //name: "user",
            //avatar: "https://placeimg.com/140/140/any",
          },
        };
        console.log(temp.time);
        items.push(message);
      });

      items.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      console.log(items);
      setMessages(items);
    });

    // setMessages([
    //   {

    //     text: "reply to developer",
    //     createdAt: new Date(),
    //     user: {
    //       _id: 1,
    //       //name: "user",
    //       //avatar: "https://placeimg.com/140/140/any",
    //     },
    //   },
    //   {

    //     text: "how are you",
    //     createdAt: new Date() - 10,
    //     user: {
    //       _id: 2,
    //       //name: "React Native",
    //       //avatar: "https://placeimg.com/140/140/any",
    //     },
    //   },

    //   {

    //     text: "Hello developer",
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       //name: "React Native",
    //       //avatar: "https://placeimg.com/140/140/any",
    //     },
    //   },
    // ]);

    console.log(messages);
  }, []);

  const onSend = useCallback((messages = []) => {
    console.log(messages[0].text);
    console.log(messages);
    firebase
      .firestore()
      .collection("users/" + firebase.auth().currentUser.uid + "/Chat")
      .add({
        text: messages[0].text,
        time: new Date(messages[0].createdAt),
        user: 1,
      });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      renderBubble={(props) => {
        return (
          <Bubble
            {...props}
            textStyle={{
              left: {
                color: "#b2b2b2",
              },
              right: {
                color: "#fff",
              },
            }}
            wrapperStyle={{
              left: {
                backgroundColor: "#8b30b5",
              },
              right: {
                backgroundColor: "#22BF7B",
              },
            }}
          />
        );
      }}
      renderAvatar={null}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
