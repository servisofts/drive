import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
class Path extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return <path {...this.props} />
    }
}
const AnimatedPath = Animated.createAnimatedComponent(Path);

type Propst = {
    d: String,
    key: String,
    fill: String,
    stroke: String,
    strokeWidth: Number,

}

export default class StrokeAnimated extends Component<Propst> {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.ValueXY({ x: 0, y: 0 }),
        };
    }
    // static defaultprops = {
    //     d: "",
    //     fill: "#fff",
    //     stroke: "#fff",
    //     strokeWidth: 0,
    // }
    componentDidMount() {
        this.fadeIn();
    }
    fadeIn = (time) => {
        Animated.timing(this.state.anim, {
            toValue: { x: 1, y: 1 },
            duration: 2500
        }).start();
    }
    render() {
        return (
            <AnimatedPath
                d={this.props.d}
                stroke={this.props.stroke}
                strokeWidth={this.props.strokeWidth}
                strokeDasharray={800}
                fill={"transparent"}
                strokeDashoffset={this.state.anim.x.interpolate({
                    inputRange: [0, 1],
                    outputRange: [800, 1600]
                })}
                key={this.props.key}
            />
        );
    }
}
