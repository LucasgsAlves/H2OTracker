import React from "react";
import { View, StyleSheet} from "react-native";
import LottieView from "lottie-react-native";

export function MetaAnimation() {
 return (
   <View style={styles.container}>
    <LottieView
    source={require("./conffet.json")}
    autoPlay
    loop={false}
    style={{ width: 200, height:200 }}
    />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
});