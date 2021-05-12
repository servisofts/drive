import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as SFileImput from '../../../Component/SFileImput';
import { connect } from 'react-redux';

class SubirArchibo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={{
                margin: 4,
                width: 120,
                height: 35,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: "#ddd",
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {
                SFileImput.choseFile({
                    component: "file",
                    type: "subir",
                    estado: "cargando",
                    // key: this.data.key
                }, (resp) => {
                    // fetch(urlImage);
                    // var obj= JSON.parse(resp.data);
                    // this.props.dispatch(obj)
                });
            }}>
                <Text style={{
                    color: "#aaa",
                    fontWeight: "bold",
                    textAlign: "center"
                }}> Subir archibo </Text>
            </TouchableOpacity>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SubirArchibo);