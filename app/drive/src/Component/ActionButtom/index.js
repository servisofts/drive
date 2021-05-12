import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from "react-native";
const ActionButtom = (props) => {
    return (
        <TouchableOpacity onPress={() => {
            props.onPress();
        }}
            style={{
                width: 100,
                height: 50,
                borderRadius: 10,
                backgroundColor: "#ddd",
                justifyContent: "center",
                alignItems: "center",
                margin: 4,
                ...props.style
            }}>
            <Text style={{
                color: "#999",
                ...props.styleText
            }}>{props.label}</Text>
        </TouchableOpacity >
    )
}
export default ActionButtom;