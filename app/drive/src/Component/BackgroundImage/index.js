import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import SImage from '../SImage';
type type = {
    source: Object
}
export default class BackgroundImage extends Component<type> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        if (!this.props.source) {
            return <View />
        }
        return <View style={{
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            position: "absolute",
            // opacity: 0.8,
            // backgroundColor: "#fff",
            ...this.props.style,
        }}>
            <SImage source={this.props.source} style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
            }} />
            <View style={{
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                position: "absolute",
                backgroundColor: "#000000",
                opacity:(0.8 + (Platform.OS == "web" ? -0.3 : 0)),
            }}>

            </View>
        </View>
    }
}
