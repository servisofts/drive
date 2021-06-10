import React, { Component } from 'react';
import { View, Text } from 'react-native';

var LAYOUT = {};
export const SSize = () => {
    return LAYOUT;
}

export default class SResponsive extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                height: "100%",
                backgroundColor: "#000"
            }} onLayout={(evt) => {
                LAYOUT = evt.nativeEvent.layout
            }}>
                {this.props.children}
            </View>
        );
    }
}
