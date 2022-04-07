import React, { useState } from "react";
import {
    View, Animated, PanResponder, Dimensions
} from "react-native";

// Dimensions of screen width   
const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

// Deck Component
const Deck = ({ data, renderCard, renderNoMoreCards, onSwipeLeft = () => {}, onSwipeRight = () => {} }) => {
    const [ index, setIndex ] = useState(0);
    const [ position ] = useState(new Animated.ValueXY());

    const onSwipeComplete = (direction) => {
        const item = data[index];

        direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
        position.setValue({ x: 0, y: 0 });
        setIndex(index + 1);
    }

    const forceSwipe = (direction) => {
        const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(position, {
            toValue: { x, y: 0 },
            duration: 250,
            useNativeDriver: true
        }).start(() => onSwipeComplete(direction));
    }

    const resetPosition = () => {
        Animated.spring(position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    // User Input, Animation Output panResponder state based on position
    const [ panResponder ] = useState(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
            position.setValue({ x: gesture.dx, y: gesture.dy })
        },
        onPanResponderRelease: (event, gesture) => {
            if (gesture.dx > SWIPE_THRESHOLD) {
                forceSwipe("right");
            }
            else if (gesture.dx < -SWIPE_THRESHOLD) {
                forceSwipe("left");
            }
            else {
                resetPosition();
            }
        }
    }));

    const getCardStyle = () => {
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ["-120deg", "0deg", "120deg"]
        });

        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        };
    };

    const renderCards = () => {
        // If no more cards in the deck...
        if (index >= data.length) {
            return renderNoMoreCards();
        }

        return data.map((item, i) => {
            console.log("log", i, index)
            if (i < index) { return null; }

            if (i === index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
                        {...panResponder.panHandlers}
                    >
                        {renderCard(item)}
                    </Animated.View>
                );
            }

            return (
                <Animated.View
                    key={item.id}
                    style={[styles.cardStyle, { top: 10 * (i - index), zIndex: 5 }]}
                >
                    {renderCard(item)}
                </Animated.View>
            );
        }).reverse();

    }

    return (
        <View>
            {renderCards()}
        </View>
    );
};

const styles = {
    cardStyle: {
        position: "absolute",
        width: SCREEN_WIDTH
    }
};

export default Deck;