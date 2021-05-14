import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity } from 'react-native';
import Svg from '../../Svg';

export default class BarraSuperior extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0),
        };
    }

    startAnimation() {
        Animated.timing(this.state.anim, {
            toValue: 100,
            duration: !this.props.duration ? 1000 : this.props.duration,
        }).start();
    }
    componentDidMount() {
        this.startAnimation();
    }

    render() {
        return (
            <Animated.View style={{
                width: "100%",
                height: 45,
                flexDirection: "row",
                transform: [
                    {
                        translateX: this.state.anim.interpolate({
                            inputRange: [0, 100],
                            outputRange: [Dimensions.get("window").width * -1, 0]
                        })
                    }
                ]
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                }}>
                    <TouchableOpacity style={{
                        width: 45,
                        height: "100%",
                        backgroundColor: "#000",
                        justifyContent: "center",
                        alignItems: "center",
                    }} activeOpacity={0.9} onPress={this.props.goBack}>
                        {!this.props.goBack ? <View /> : <Svg resource={require('../../img/arrow.svg')}
                            style={{
                                width: "50%",
                                height: "50%",
                                fill: "#fff"
                            }} />}

                    </TouchableOpacity>
                    <View style={{
                        flex: 1,
                        backgroundColor: "#000",
                        borderBottomEndRadius: 30,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: "bold"
                        }}>{this.props.title}</Text>
                    </View>
                </View>
                <View style={{
                    width: 130,
                    height: "100%",
                    padding: 4,
                }}>
                    <Svg name="logo" style={{
                        with: "100%",
                        height: "100%",
                        fill: "#000"
                    }} />
                </View>
            </Animated.View>
        );
    }
}
