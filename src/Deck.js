import React, { useState } from "react";
import { View, Animated, PanResponder } from "react-native";

// Deck Component
const Deck = ({ data, renderCard }) => {
    const position = new Animated.ValueXY();
    // User Input, Animation Output panResponder state based on position
    const [ panResponder ] = useState(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
            position.setValue({ x: gesture.dx, y: gesture.dy })
        },
        onPanResponderRelease: () => {}
    }));

    const renderCards = () => data.map(item => renderCard(item));

    return (
        <Animated.View
            style={position.getLayout()}
            {...panResponder.panHandlers}
        >
            {renderCards()}
        </Animated.View>
    );
};

export default Deck;