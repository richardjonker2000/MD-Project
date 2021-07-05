import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  FlatList,
  Button,
  Text,
  TextInput,
} from "react-native";

import { AuthContext } from "../context/AuthContext";
import { firebase } from "../firebase/config";
import styles from "../styles/main";
import { Icon } from "react-native-elements";

const OrdersHistory = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filtData, setFiltData] = useState([]);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const user = useContext(AuthContext);

  useEffect(() => {
    var orders = firebase
      .firestore()
      .collection("users/" + firebase.auth().currentUser.uid + "/orders");
    orders.onSnapshot((querySnapshot) => {
      var items = [];
      querySnapshot.forEach((doc) => {
        var temp = doc.data();
        temp["id"] = doc.id;
        items.push(temp);
      });
      items = items.filter((item) => item.closed == true);
      items = items.sort(function (a, b) {
        return new Date(b.datePlaced) - new Date(a.datePlaced);
      });
      setData(items);
      setFiltData(items);
      setLoading(false);
    });
  }, []);

  const filterItems = (day1, month1, year1) => {
    var date = new Date(year1, month1, day1);
    var items = data;
    items = items.filter((item) => {
      var res = item.datePlaced.split("/");
      if (res[0] == year1 || year1 == "") {
        if (res[1] == month1 || month1 == "") {
          if (res[2] == day1 || day1 == "") {
            return true;
          }
        }
      }
      return false;
    });
    setFiltData(items);
  };

  const ListOrders = ({ order }) => {
    return (
      <View style={styles.orderListItem}>
        <Text style={styles.orderTitle}>Order #{order.id}</Text>
        <Text style={styles.orderBold}>
          Order date: <Text style={styles.orderBody}>{order.datePlaced} </Text>
        </Text>
        <Text style={styles.orderBold}>
          Shipment Deadline:{" "}
          <Text style={styles.orderBody}>{order.shipmentDeadline} </Text>
        </Text>
        <Text style={styles.orderBold}>
          Supplier Status:{" "}
          <Text style={styles.orderBody}>{order.supplierStatus} </Text>{" "}
        </Text>

        <View style={styles.orderSeparator}></View>
        <View>
          <View>
            <Button
              title="See More"
              color="#22BF7B"
              onPress={() =>
                props.navigation.navigate("Order", { order: order })
              }
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.floatingContainer}>
        <View style={styles.floatingContainerSearch}>
          <TextInput
            style={[styles.input, { paddingVertical: 10 }]}
            placeholder="DD"
            onChangeText={(value) => {
              setDay(value);
              filterItems(value, month, year);
            }}
          />
          <Text>/</Text>
          <TextInput
            style={[styles.input, { paddingVertical: 10 }]}
            placeholder="MM"
            onChangeText={(value) => {
              setMonth(value);
              filterItems(day, value, year);
            }}
          />
          <Text>/</Text>
          <TextInput
            style={[styles.input, { paddingVertical: 10 }]}
            placeholder="YYYY"
            onChangeText={(value) => {
              setYear(value);
              filterItems(day, month, value);
            }}
          />
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={[styles.flatList, { marginTop: 50 }]}
          data={filtData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ListOrders order={item} />}
        />
      )}
    </View>
  );
};

export default OrdersHistory;
