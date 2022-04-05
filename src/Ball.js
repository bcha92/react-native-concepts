import React from "react-native";
import { View, Animated } from "react-native";

// Ball Component (Animation)
const Ball = () => {
    // Animates position of Ball
    const position = new Animated.ValueXY(0, 0);
    Animated.spring(position, {
        toValue: { x: 200, y: 500 }
    }).start();

    return (
        <Animated.View style={position.getLayout()}>
            <View style={styles.ball} />
        </Animated.View>
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