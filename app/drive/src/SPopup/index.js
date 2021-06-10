import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import SPopupAnimated from './SPopupAnimated';

const POPUPS = {};

var update = () => {

}
export const SPopupClose = (key) => {
    delete POPUPS[key]
    update();
}
export const SPopupOpen = (props) => {
    POPUPS[props.key] = (
        <TouchableWithoutFeedback style={{}}
            onPress={() => {
                SPopupClose(props.key)
            }}>
            <View style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "#000000aa",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}>

                <SPopupAnimated >
                    <TouchableOpacity activeOpacity={1} style={{
                        width: "100%",
                        height: "100%"
                    }}>
                        {props}
                    </TouchableOpacity>
                </SPopupAnimated>

            </View>
        </TouchableWithoutFeedback >

    );
    update()
    return () => { SPopupClose(props.key) }
}

export default class SPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        update = () => this.setState({ ...this.state });
    }

    render() {

        if (Object.keys(POPUPS).length <= 0) {
            return <View />
        }
        return (
            Object.keys(POPUPS).map((key) => {
                return POPUPS[key]
            })
        );
    }
}
