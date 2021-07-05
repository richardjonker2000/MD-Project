import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;

//0D1B1E - black
//818F9C - grey
//22BF7B - green
//A9F0D1 - mint
//FFF7F8 - white

const styles = StyleSheet.create({
  //main app styels
  mainContainer: {
    paddingTop: statusBarHeight,
    flex: 1,
  },
  headerBG: {
    backgroundColor: "#22BF7B",
  },
  headerBold: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A9F0D1",
  },
  logOutTopContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A9F0D1",
  },

  logOutContainer: {
    flexDirection: "row",
  },
  logOutButtonContainer: {
    paddingHorizontal: 20,
  },

  inputContainer: {
    flexDirection: "row",
    minWidth: 250,
    height: 44,
    paddingVertical: 10,
    paddingLeft: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0D1B1E",
    marginBottom: 20,
  },

  inputContainerWithBG: {
    flexDirection: "row",
    width: 250,
    height: 44,
    paddingVertical: 10,
    paddingLeft: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainerWithDarkerBG: {
    flexDirection: "row",
    width: 250,
    height: 44,
    paddingVertical: 10,
    paddingLeft: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginBottom: 20,
    backgroundColor: "#EEEEEE",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    flex: 1,
  },
  button: {
    flexDirection: "row",
    width: 250,
    height: 44,
  },

  profileImg: {
    borderColor: "#EEEEEE",
    borderWidth: 5,
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "#eee",
    alignSelf: "center",
    margin: 20,
  },

  inputBoxIcon: {
    paddingLeft: 5,
    paddingRight: 10,
  },

  dropwdownInput: {
    width: 200,
    //    height: 44,
    //    borderRadius: 10,
    //    borderWidth: 1,
    borderColor: "#0D1B1E",
    //    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
  },

  headerTwo: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10,
  },

  flatList: {
    width: "100%",
    flexGrow: 0,
  },
  // input_large: {
  //     width: 250,
  //     height: 250,
  //     padding: 10,
  //     borderWidth: 1,
  //     borderColor: '#0D1B1E',
  //     marginBottom: 10,
  // },

  //sign in screen
  SignInbutton: {
    paddingBottom: 20,
  },

  signInFormFields: {
    paddingBottom: 20,
  },

  logo: {
    alignSelf: "center",
    width: 225,
    height: 75,
    resizeMode: "contain",
  },

  layer2: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#A9F0D1",
  },

  signInContainer: {
    borderWidth: 1,
    borderColor: "#0D1B1E",
    borderRadius: 20,
    margin: 20,
    padding: 20,
    backgroundColor: "#FFF7F8",
  },

  floatingContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    flexDirection: "row",
    left: 0,
    top: 0,
    width: "100%",
    height: "10%",
    zIndex: 999,
    backgroundColor: "#22BF7B",
  },
  floatingContainerSearch: {
    flexDirection: "row",

    //paddingVertical: 10,
    paddingLeft: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    margin: 10,
    backgroundColor: "#FFFFFF",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  orderListItem: {
    borderWidth: 1,
    borderColor: "#0D1B1E",
    borderRadius: 15,
    margin: 15,
    padding: 15,
    backgroundColor: "#FFF7F8",
  },

  orderItem: {
    borderWidth: 1,
    borderColor: "#0D1B1E",
    borderRadius: 15,
    margin: 20,
    padding: 20,
    backgroundColor: "#FFF7F8",
  },
  productListItem: {
    marginHorizontal: 10,

    paddingHorizontal: 10,

    backgroundColor: "#FFF7F8",
  },
  orderTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  orderBold: {
    fontWeight: "bold",
  },
  orderContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0D1B1E",
    marginBottom: 20,
  },
  orderContainerWhite: {
    color: "#FFF7F8",
  },
  orderContainerGreen: {
    alignItems: "flex-end",
    backgroundColor: "#22BF7B",
    width: "45%",
    fontWeight: "bold",
    color: "#FFF7F8",
    padding: 10,
    paddingRight: 2,
    height: "100%",
    borderRadius: 10,
  },
  orderBody: {
    alignItems: "flex-start",
    fontWeight: "normal",
    backgroundColor: "#FFF7F8",
  },
  orderSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#0D1B1E",
    marginTop: 8,
    marginBottom: 8,
  },
  orderSeparatorLg: {
    borderBottomWidth: 1,
    borderBottomColor: "#0D1B1E",
    marginTop: 40,
    marginBottom: 8,
  },

  button: {
    marginTop: 20,
    marginBottom: 20,
  },

  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },

  topContainer: {
    flex: 5,
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "#b0e0e6",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
  bottomleftContainer: {
    flex: 1,
    backgroundColor: "#22608c",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomrightContainer: {
    flex: 1,
    backgroundColor: "#4682b4",
    alignItems: "center",
    justifyContent: "center",
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
  boldWhiteText: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default styles;
