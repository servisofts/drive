import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../Params';
import SGrid from '../../../SResponsive/SGrid';

class ListaObservadores extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        this.sendServer()
    }
    getUsuario(key) {
        var cabecera = this.props.state.usuarioReducer.data["registro_administrador"];
        if (!cabecera) cabecera = {};
        var usr = cabecera[key];
        if (!usr) {
            if (this.props.state.usuarioReducer.estado == "cargando") {
                return false
            }
            var object = {
                component: "usuario",
                type: "getById",
                version: "2.0",
                estado: "cargando",
                cabecera: "registro_administrador",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key: key
            }
            // alert(JSON.stringify(object));
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return false;
        }
        return usr;
    }

    sendServer() {
        var object = {
            component: "observador",
            type: "getAll",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        }
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    }
    render() {
        var data = this.props.state.observadorReducer.data;
        if (!data) {
            if (this.props.state.observadorReducer.estado == "cargando") { return <ActivityIndicator color={"#fff"} /> }
            if (this.props.state.observadorReducer.estado == "error") { return <ActivityIndicator color={"#fff"} /> }
            this.sendServer()
            return <ActivityIndicator color={"#fff"} />
        }

        return Object.keys(data).map((key) => {
            var obj = data[key];
            var usr = this.getUsuario(key);
            if (!usr) {
                return <ActivityIndicator color={"#fff"} />
            }
            return <SGrid >
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: "#ffffff22",
                    borderRadius: 8,
                    height: 70,
                    flexDirection: "row",
                    padding: 8,
                }} onPress={() => {
                    this.props.state.fileReducer.activeRoot = { key: "shared", descripcion: usr.Nombres, usr: usr }
                    this.props.navigation.navigate("CarpetasPage");
                }}>
                    <View style={{
                        width: 70,
                        height: "100%",
                    }}>
                        {this.props.state.imageReducer.getImage(AppParams.urlImages + key, {
                            width: "100%",
                            height: "100%",
                        })}
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: "#fff"
                        }}>{usr["Nombres"]} {usr["Apellidos"]}</Text>
                        <Text style={{
                            fontSize: 12,
                            color: "#fff"
                        }}># de archivos: {obj.cantidad}</Text>
                    </View>

                </TouchableOpacity>
            </SGrid>
        })
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ListaObservadores);