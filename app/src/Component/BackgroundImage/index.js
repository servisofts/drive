import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { STheme } from '../../SComponent';
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
    getBackground = () => {
        // if (!this.props.source) {
        //     return <View />
        // }
        return <View style={{
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            position: "absolute",
            // opacity: 0.8,
            backgroundColor: STheme().backgroundColor,
            ...this.props.style,
        }}>
            <SImage source={require("../../img/fondos/background.png")} style={{
                width: "100%",
                height: "100%",
                resizeMode: "center",
                objectFit: "contain",
                opacity: 0.7,

            }}  />
            {/* <View style={{
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                position: "absolute",
                // opacity: (0.9 + (Platform.OS == "web" ? +0.2 :0 )),
                opacity: 0.9,
                backgroundColor: "#00000099"
            }}>

            </View> */}
        </View>
    }
    render() {
        // if (!this.props.source) {
        //     return <View />
        // }
        return this.getBackground()
    }
}
