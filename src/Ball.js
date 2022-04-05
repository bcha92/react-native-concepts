import React from "react-native";
import { View } from "react-native";

// Ball Component
const Ball = () => {
    return (
        <View style={styles.ball} />
    );
};

const styles = {
    ball: {
        height: 60,
        wideth: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: "black"
    }
};

export default Ball; 