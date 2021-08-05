import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import STheme from '../../../../STheme';

type tprops = {
    label: String,
    icon: Component,
    onPress: Function
}
export default class BtnAcceso extends Component<tprops> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                width: Dimensions.get("window").width / 4,
                maxWidth: 180,
                height: (Dimensions.get("window").width / 4) + 20,
                maxHeight: 180,
                padding: 8,
            }
            }>
                <TouchableOpacity style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                }} onPress={() => {
                    if (this.props.onPress) this.props.onPress();
                }}>
                    <View style={{
                        width: (Dimensions.get("window").width / 4) - 20,
                        height: (Dimensions.get("window").width / 4) - 20,
                        maxWidth: 160,
                        maxHeight: 160,
                        borderRadius: 8,
                        // backgroundColor: STheme.color.card,
                    }}>
                        {this.props.icon}
                    </View>
                    <Text style={{
                        color: STheme.color.text,
                        fontSize: 10 * ((Dimensions.get("window").width + Dimensions.get("window").height) / 2) * 0.0015,
                        textAlign: "center"
                    }}>{this.props.label}</Text>
                </TouchableOpacity>

            </View >
        );
    }
}
