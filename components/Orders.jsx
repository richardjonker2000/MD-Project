import React, { useContext, useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Button,
  Text,
  ScrollView,
} from "react-native";

import { AuthContext } from "../context/AuthContext";
import { firebase } from "../firebase/config";
import styles from "../styles/main";
import { FAB } from "react-native-paper";

const Orders = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
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

      items = items.filter((item) => item.closed == false);
      items = items.sort(function (a, b) {
        return new Date(b.datePlaced) - new Date(a.datePlaced);
      });
      setData(items);
      setLoading(false);
    });
  }, []);

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
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <FlatList
            style={styles.flatList}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ListOrders order={item} />}
          />

          <FAB
            style={styles.fab}
            large
            icon="history"
            onPress={() => props.navigation.navigate("OrdersHistory")}
          />
        </View>
      )}
    </View>
  );
};

export default Orders;
