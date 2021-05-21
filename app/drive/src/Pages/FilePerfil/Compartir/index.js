import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class Compartir extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                padding:8,
            }}>
                <Text style={{
                    color: "#fff",
                    fontSize: 16,
                    padding: 8,
                    textAlign: "center",
                    textAlignVertical: "center"
                }}>Compartir</Text>
                <View style={{
                    flex: 1,
                    width: "100%",
                }}></View>
                <View style={{
                    width: "100%",
                    marginTop: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-around"
                    // backgroundColor:"#fff"
                }}>
                    <TouchableOpacity style={{
                        width: 100,
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: "#ff555588",
                        justifyContent: "center",
                        alignItems: "center"
                    }} onPress={() => {
                        // var obj = { ...this.state.obj };
                        // delete obj["data"];
                        // obj.estado = 0;
                        // this.props.state.socketReducer.session[AppParams.socket.name].send({
                        //     component: "file",
                        //     type: "editar",
                        //     data: obj,
                        //     path: this.props.state.fileReducer.routes
                        // }, true);
                        // this._confirmarEliminar.setObj(false)
                        this.props.close();
                    }}>
                        <Text style={{ color: "#fff" }}>Eliminar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: 100,
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: "#ffffff88",
                        justifyContent: "center",
                        alignItems: "center"
                    }} onPress={() => {
                        this.props.close();
                    }}>
                        <Text style={{ color: "#fff" }}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
