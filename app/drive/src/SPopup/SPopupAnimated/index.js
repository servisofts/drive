import React, { Component } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';

export default class SPopupAnimated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.ValueXY({ x: 0, y: 0 }),
        };
    }
    componentDidMount() {
        this.fadeIn();
    }

    fadeIn() {
        new Animated.timing(this.state.anim, {
            duration: 300,
            toValue: { x: 1, y: 1 }
        }).start();
    }
    render() {
        return (
            <Animated.View style={{
                width: "90%",
                maxWidth: 600,
                maxHeight: "90%",
                justifyContent: "center",
                alignItems: "center",
                transform: [{
                    translateX: this.state.anim.x.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0]
                    })
                }, {
                    translateY: this.state.anim.y.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-Dimensions.get("window").height, 0]
                    })
                }],

            }}>
                {this.props.children}
            </Animated.View>
        );
    }
}
