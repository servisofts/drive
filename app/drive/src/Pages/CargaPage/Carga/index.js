import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as SSStorage from '../../../SSStorage';
import AppParams from '../../../Params/index.json'
import SThread from '../../../Component/SThread';
var lastSend = 0;

const Carga = (props) => {
    const [mensaje, setMensaje] = React.useState("");
    const [redirect, setRedirect] = React.useState(false);
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
                props.state.usuarioReducer.usuarioCargado = true;
                if (!value) {
                    props.state.usuarioReducer.usuarioLog = false;
                    return;
                }
                if (value.length <= 0) {
                    props.state.usuarioReducer.usuarioLog = false;
                    return;
                }
                props.state.usuarioReducer.usuarioLog = JSON.parse(value)
                return;
            });
            return "Buscando usuario...";
        } else {
            if (!props.state.usuarioReducer.usuarioLog) {
                props.navigation.replace("LoginPage");
                ///no hay usuario
            } else {
                props.navigation.replace("CarpetasPage");
                ///existe usuario
            }
        }
        return "Cargando...";
    }
    var mensajeTemp = getMensaje();
    if (mensajeTemp != mensaje) {
        setMensaje(mensajeTemp);
        return <View />;
    }
    new SThread(3000, "hiloVerificarEntrada").start(() => {
        // props.navigation.replace("LoginPage");
        props.navigation.replace("CarpetasPage");
    })
    return (
        <View style={{
        }}>
            <Text>{mensaje}</Text>
        </View>
    );
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Carga);