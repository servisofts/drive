import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../../Params';

class Permisos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getPermisos() {
        if (!this.props.data) {
            return <View />
        }
        var permisos = this.props.data.permisos;
        if (!permisos) {
            permisos = {};
        }
        return ["ver", "crear", "subir", "editar", "eliminar"].map((key) => {
            var obj = permisos[key];
            if (!obj) {
                obj = {};
            }
            return <View style={{
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableOpacity style={{
                    width: 30,
                    height: 30,
                    borderWidth: 1,
                    borderRadius: 4,
                    backgroundColor: (obj.estado ? "#fff" : "transparent")
                }} onPress={() => {
                    this.props.state.socketReducer.session[AppParams.socket.name].send({
                        component: "observadorPermiso",
                        type: "editar",
                        estado: "cargando",
                        key_file:this.props.data.key_file,
                        data: {
                            ...obj,
                            estado: !obj.estado ? 1 : 0
                        },
                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    }, true);
                }}>

                </TouchableOpacity>
                <Text style={{
                    color: "#fff"
                }}>{key}</Text>
            </View>
        })
    }
    render() {
        return (
            <View style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-evenly"
            }}>
                {this.getPermisos()}
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Permisos);