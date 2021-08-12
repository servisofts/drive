import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as SSStorage from '../../../SSStorage';
import AppParams from '../../../Params/index.json'
import { SThread } from '../../../SComponent';
var lastSend = 0;

const Carga = (props) => {
    const [mensaje, setMensaje] = useState("");
    const getMensaje = () => {
        if (!props.navigation) {
            return "No se encontro navegacion.";
        }
        if (!props.state.socketReducer.session[AppParams.socket.name]) {
            return "No existe la session";
        }
        if (!props.state.socketReducer.session[AppParams.socket.name].isOpen) {
            return props.state.socketReducer.session[AppParams.socket.name].estado;
        }
        if (!props.state.usuarioReducer.usuarioCargado) {
            SSStorage.getItem(AppParams.storage.urlLog, (value) => {
                if (!value) {
                    props.state.usuarioReducer.usuarioLog = false;
                    return
                }
                if (value.length <= 0) {
                    props.state.usuarioReducer.usuarioLog = false;
                    return;
                }
                props.state.usuarioReducer.usuarioLog = JSON.parse(value)
                return;
            });
            props.state.usuarioReducer.usuarioCargado = true;
            return "Buscando usuario...";
        }
        return "Cargando...";
    }
    var mensajeTemp = getMensaje();
    if (mensajeTemp != mensaje) {
        setMensaje(mensajeTemp);
        return <View />;
    }
    new SThread(2500, "hiloVerificarEntrada", true).start(() => {
        console.log(props.navigation);
        if (!props.state.usuarioReducer.usuarioLog) {
            props.navigation.replace("LoginPage");
        } else {
            console.log("Inicio")
            props.navigation.replace("InicioPage");
        }
    })
    return (
        <View style={{
            marginTop: 30,
        }}>
            <Text style={{
                color: "#666"
            }}>{mensaje}</Text>
        </View>
    );
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Carga);