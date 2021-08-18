import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../../Params';
import Svg from '../../../../Svg/index';

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
        var DataPer = {
            "ver": {
                icon: require("../../../../img/permisos/ver.svg"),
            },
            "crear": {
                icon: require("../../../../img/permisos/crear.svg"),
            },
            "subir": {
                icon: require("../../../../img/permisos/subir.svg"),
            },
            "editar": {
                icon: require("../../../../img/permisos/editar.svg"),
            },
            "eliminar": {
                icon: require("../../../../img/permisos/eliminar.svg"),
            }
        }
        return Object.keys(DataPer).map((key) => {
            var obj = permisos[key];
            if (!obj) {
                obj = {};
            }
            return <View style={{
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableOpacity style={{
                    width: 35,
                    height: 35,
                    borderColor: "#ffffff66",
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                }} onPress={() => {
                    this.props.state.socketReducer.session[AppParams.socket.name].send({
                        component: "observadorPermiso",
                        type: "editar",
                        estado: "cargando",
                        key_file: this.props.data.key_file,
                        data: {
                            ...obj,
                            estado: !obj.estado ? 1 : 0
                        },
                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    }, true);
                }}>
                    <Svg resource={DataPer[key].icon} style={{
                        width: 25,
                        height: 25,
                    }} />

                    {obj.estado ? (
                        <View style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#000000cc",
                            position: "absolute",
                            borderRadius: 4,
                        }}>
                        </View>
                    ) : (
                        <View />
                    )}
                </TouchableOpacity>
                <Text style={{
                    color: "#fff",
                    fontSize: 10,
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