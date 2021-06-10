import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { SSize } from '..';

export default class SGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {

        return (
            <View style={{
                width: SSize().width > 500 ? "50%" : "100%",
                flexDirection: "row",
                padding: 8,
            }} onLayout={(evt) => {
                this.setState({ layout: { ...evt.nativeEvent.layout } })
            }}>
                {this.props.children}
            </View>
        );
    }
}
