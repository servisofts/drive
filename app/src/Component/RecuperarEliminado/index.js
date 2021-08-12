import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Params';
import { SPopupClose, SView } from '../../SComponent';

class RecuperarEliminado extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <SView style={{
                width: "90%",
                maxWidth: 600,
                height: 200,
                backgroundColor: "#ffffff22",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center"
            }} props={{
                withoutFeedback: true,
            }}>
                <Text style={{
                    color: "#fff",
                    fontSize: 18,
                    padding: 8,
                    textAlign: "center",
                    textAlignVertical: "center"
                }}>Esta seguro que desea recuperar el elemento?</Text>
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
                        var obj = { ...this.props.data };
                        // alert(JSON.stringify(obj));
                        delete obj["data"];
                        obj.estado = 1;
                        this.props.state.socketReducer.session[AppParams.socket.name].send({
                            component: "file",
                            type: "editar",
                            data: obj,
                            tipo_seguimiento: "recuperar_papelera",
                            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                            path: this.props.state.fileReducer.routes
                        }, true);
                        SPopupClose("acept_recuperar")
                        // this._confirmarEliminar.setObj(false)
                    }}>
                        <Text style={{ color: "#fff" }}>Recuperar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: 100,
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: "#ffffff88",
                        justifyContent: "center",
                        alignItems: "center"
                    }} onPress={() => {
                        SPopupClose("acept_recuperar")
                        // this._confirmarEliminar.setObj(false)
                    }}>
                        <Text style={{ color: "#fff" }}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RecuperarEliminado);