import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import AppParams from '../../Params';
import Svg from '../../Svg';
import FilePreview from '../CarpetasPage/FilePreview';
import * as SImageImput from '.././../Component/SImageImput';
import { connect } from 'react-redux';
import moment from 'moment';
import SImage from '../../Component/SImage';
import CerrarSession from './CerrarSession';


class UsuarioPerfil extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getPerfil() {
        var usuario = this.props.state.usuarioReducer.usuarioLog
        var usrD = this.props.state.usuarioReducer.usuarioDatos;
        if (!usrD) {
            if (this.props.state.usuarioReducer.estado == "cargando") {
                return <ActivityIndicator color={"#fff"} />
            }
            var object = {
                component: "usuario",
                type: "getById",
                version: "2.0",
                estado: "cargando",
                cabecera: "registro_administrador",
                key: usuario.key
            }
            // alert(JSON.stringify(object));
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <ActivityIndicator color={"#fff"} />
        }
        return (
            <View style={{
                width: "95%",
                height: 130,
                borderBottomWidth: 1,
                borderColor: "#aaa",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
            }}>
                <View style={{
                    width: 100,
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableOpacity style={{
                        width: "90%",
                        height: "90%",
                        backgroundColor: "#ffffff55",
                        borderRadius: 8,
                        overflow: "hidden",
                    }} onPress={() => {
                        SImageImput.choseFile({
                            component: "usuario",
                            type: "subirFoto",
                            estado: "cargando",
                            key: usuario.key
                        }, (resp) => {
                            this.props.dispatch({
                                component: "image",
                                type: "cambio",
                                url: AppParams.urlImages + this.props.state.usuarioReducer.usuarioLog.key,
                            })
                            // this.state.repaint = new Date().getTime()
                            // this.setState({ ...this.state });
                        });
                    }}>
                        {/* {"foto"} */}
                        {this.props.state.imageReducer.getImage(AppParams.urlImages + this.props.state.usuarioReducer.usuarioLog.key, {
                            width: "100%",
                            height: "100%",
                        })}

                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                    // backgroundColor:"#000"
                }}>
                    <View style={{
                        width: "95%",
                        flex: 1,
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            flex: 5,
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#fff"
                        }}>{usrD.datos["Nombres"] + " " + usrD.datos["Apellidos"]} </Text>
                    </View>
                    <View style={{
                        width: "95%",
                        flex: 1,
                    }}>
                        <Text style={{
                            width: "90%",
                            fontSize: 14,
                            color: "#bbb"
                        }}>{usrD.datos["Correo"]} </Text>
                        <Text style={{
                            width: "90%",
                            fontSize: 14,
                            color: "#bbb"
                        }}>{usrD.datos["Telefono"]} </Text>
                        <Text style={{
                            width: "90%",
                            fontSize: 10,
                            color: "#bbb"
                        }}>Fecha de registro: {moment(new Date(usrD.fecha_on)).format("DD/MM/YYYY")} </Text>
                    </View>
                </View>
            </View>
        )
    }
    render() {

        return (
            <View style={{
                width: "100%",
                height: "100%",
            }}>
                <BarraSuperior duration={500} title={"Perfil de usuario"} navigation={this.props.navigation} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "#000"
                }}>
                    <BackgroundImage source={require("../../img/fondos/color/1.jpg")} />
                    <View style={{
                        width: "90%",
                        borderRadius: 8,
                        height: "90%",
                        maxWidth: 500,
                        backgroundColor: "#ffffff44",
                        alignItems: "center"
                    }}>
                        {this.getPerfil()}
                        <CerrarSession navigation={this.props.navigation} />
                    </View>
                </View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(UsuarioPerfil);