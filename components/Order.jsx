import React, { useEffect, useState } from "react";
import { View, FlatList, Button, Text, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import styles from "../styles/main";
import { Picker } from "@react-native-picker/picker";
import { firebase } from "../firebase/config";
import { Rating } from "react-native-rating-element";

const Order = (props) => {
  const { order } = props.route.params;

  //console.log(orderParam)
  //console.log(order)

  const [order2, setOrder2] = useState(order);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // console.log(order.id);
    var orders = firebase
      .firestore()
      .collection(
        "/users/" +
          firebase.auth().currentUser.uid +
          "/orders/" +
          order.id +
          "/products"
      );
    //console.log(orders);
    orders.onSnapshot((querySnapshot) => {
      var items = [];
      querySnapshot.forEach((doc) => {
        var temp = doc.data();
        temp["id"] = doc.id;
        items.push(temp);
      });
      setRating(order.rating);
      setData(items);
      setLoading(false);
    });
  }, []);

  const updateOrder = () => {
    if (status !== null) {
      firebase
        .firestore()
        .collection("users/" + firebase.auth().currentUser.uid + "/orders")
        .doc(order.id)
        .update({
          status: status,
          rating: rating,
        })
        .then(() => {
          console.log("");
        });
    } else {
      firebase
        .firestore()
        .collection("users/" + firebase.auth().currentUser.uid + "/orders")
        .doc(order.id)
        .update({
          rating: rating,
        })
        .then(() => {
          console.log("");
        });
    }

    alert(" Data Updated ");
  };

  const ListProduct = ({ product }) => {
    return (
      <View style={styles.productListItem}>
        <Text style={styles.orderBold}>
          {product.quantity} x {product.id} -{" "}
          <Text style={styles.orderBody}> {product.name}</Text>
        </Text>
        <View style={styles.orderSeparator}></View>
      </View>
    );
  };

  const onStarRatingPress = (rating) => {
    var tempData = order2;
    tempData.rating = rating;

    setOrder2(tempData);
    console.log(order2);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.layer2}>
          <View style={styles.orderItem}>
            <Text style={styles.orderTitle}>Order #{order2.id}</Text>

            <View style={styles.orderContainer}>
              <View style={[styles.orderContainerGreen]}>
                <Text style={[styles.orderBold]}>Order date: </Text>
              </View>
              <Text style={{ paddingHorizontal: 10 }}>
                {order2.datePlaced}{" "}
              </Text>
            </View>

            <View style={styles.orderContainer}>
              <View style={[styles.orderContainerGreen]}>
                <Text style={[styles.orderBold]}>Expected Arrival: </Text>
              </View>
              <Text style={{ paddingHorizontal: 10 }}>
                {order2.expectedDelivery}{" "}
              </Text>
            </View>

            <View style={styles.orderContainer}>
              <View style={[styles.orderContainerGreen]}>
                <Text style={[styles.orderBold]}>Address: </Text>
              </View>
              <Text style={{ paddingHorizontal: 10, flex: 1 }}>
                {order2.address}{" "}
              </Text>
            </View>

            {order2.closed ? (
              <View>
                <View style={styles.orderContainer}>
                  <View style={[styles.orderContainerGreen]}>
                    <Text style={[styles.orderBold]}>Status: </Text>
                  </View>
                  <Text style={{ paddingHorizontal: 10 }}>
                    {order2.status}{" "}
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    paddingBottom: 20,
                    paddingHorizontal: 80,
                  }}
                >
                  <Rating
                    rated={rating}
                    style={{}}
                    totalCount={5}
                    ratingColor="#f1c644"
                    ratingBackgroundColor="#d4d4d4"
                    onIconTap={(position) => setRating(position)}
                    size={24}
                    icon="ios-star"
                    direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
                  />
                </View>
              </View>
            ) : (
              //put review here aswell
              <View>
                <View style={styles.orderContainer}>
                  <View style={[styles.orderContainerGreen]}>
                    <Text style={[styles.orderBold]}>Status: </Text>
                  </View>
                  <View style={styles.dropwdownInput}>
                    <Picker
                      style={styles.input}
                      selectedValue={order2.status}
                      onValueChange={(itemValue, itemIndex) =>
                        setStatus(itemValue)
                      }
                    >
                      <Picker.Item
                        label="Order Received"
                        value="Order Received"
                      />
                      <Picker.Item label="Order Ready" value="Order Ready" />
                      <Picker.Item
                        label="Order Forwarded"
                        value="Order Forwarded"
                      />
                    </Picker>
                  </View>
                </View>
              </View>
            )}

            <FlatList
              style={styles.flatList}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ListProduct product={item} />}
            />

            <View style={styles.SignInbutton}>
              <Button
                title="save"
                color="#22BF7B"
                onPress={() => updateOrder()}
              />
            </View>
            <View style={styles.SignInbutton}>
              <Button
                title="Go back"
                color="#22BF7B"
                onPress={() => props.navigation.goBack()}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Order;
