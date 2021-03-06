import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../Params';
import Permisos from './Permisos';

class Usuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    ordenador = (dataObj) => {
        //hacer metodo de ordenamiento
        var data = dataObj;
        var listaKeys = Object.keys(dataObj)
        var dirOrder = "desc";
        var instance = this;
        listaKeys.sort(function (a, b) {
            var textA = new Date(data[a].fecha).getTime();
            var textB = new Date(data[b].fecha).getTime();
            if (dirOrder == "asc") {
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            } else {
                return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
            }
        });
        return listaKeys;
    }
    componentDidMount() {
        this.consultar()
    }
    consultar() {
        this.props.state.socketReducer.session[AppParams.socket.name].send({
            component: "observadorPermiso",
            type: "getAll",
            estado: "cargando",
            key_file: this.props.file.key,
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        }, true);
    }
    getUsuario(key) {
        var cabecera = this.props.state.usuarioReducer.data["registro_administrador"];
        if (!cabecera) cabecera = {};
        if (!key) { return false }
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
    render() {
        var seguimiento = this.props.state.observadorPermisoReducer.data[this.props.file.key];
        if (!seguimiento) {
            if (this.props.state.observadorPermisoReducer.estado == "cargando") {
                return <ActivityIndicator color={"#fff"} />
            }
            if (this.props.state.observadorPermisoReducer.estado == "error") {
                return <Text>Error</Text>
            }
            this.consultar()
            return <ActivityIndicator color={"#fff"} />
        }
        var Lista = this.ordenador(seguimiento).map((key) => {
            var obj = seguimiento[key];
            console.log(obj)
            if (!obj.key_usuario) {
                return <View />
            }

            var usr = this.getUsuario(obj.key_usuario);
            if (!usr) {
                return <ActivityIndicator color={"#fff"} />
            }
            return <View style={{
                width: "100%",
                height: 50,
                backgroundColor: "#ffffff22",
                margin: 4,
                borderRadius: 4,
                justifyContent: "center",
                alignItems: "center",

            }}>
                <View style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 4,
                }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#fff",
                        borderRadius: 4,
                        overflow: 'hidden',
                    }}>
                        {this.props.state.imageReducer.getImage(AppParams.urlImages + usr.key, {
                            width: "100%",
                            height: "100%",
                        })}
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: "row"
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <Text style={{
                                color: "#fff",
                                padding: 4,
                            }}>{usr["Nombres"]}</Text>
                        </View>
                        <View style={{
                            flex: 3,
                        }}>
                            <Permisos data={obj} />
                        </View>
                    </View>
                </View>
            </View>
        })
        return (
            <View style={{
                width: "95%",
                flex: 1,
                // backgroundColor: "#ffffff44",
                borderRadius: 8,
                marginTop: 4,
            }}>
                {Lista}
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Usuarios);