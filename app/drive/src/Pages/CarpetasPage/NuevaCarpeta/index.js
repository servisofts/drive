import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../Params';

class NuevaCarpeta extends Component {
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
                var object = {
                    component: "file",
                    type: "registro",
                    estado: "cargando",
                    data: {
                        descripcion: "test"
                    }
                }
                this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            }}>
                <Text style={{
                    color: "#aaa",
                    fontWeight: "bold",
                    textAlign: "center"
                }}> Nueva carpeta </Text>
            </TouchableOpacity>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(NuevaCarpeta);