import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../../Params';
import Svg from '../../../../Svg';

class NuevaCarpeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <TouchableOpacity style={{
                    margin: 4,
                    width: 45,
                    height: 35,
                    // borderWidth: 1,
                    borderRadius: 8,
                    borderColor: "#ddd",
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={() => {
                    var object = {
                        component: "file",
                        type: "registro",
                        estado: "cargando",
                        path: this.props.state.fileReducer.routes,
                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                        data: {
                            descripcion: "Nueva carpeta."
                        }
                    }
                    this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                }}>
                    <Svg resource={require('../../../../img/addFolder.svg')} style={{
                        width: 35,
                        height: 35,
                    }} />
                    {/* <Text style={{
                        fontSize: 10,
                        color: "#aaa",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}> Nueva carpeta </Text> */}
                </TouchableOpacity>
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(NuevaCarpeta);