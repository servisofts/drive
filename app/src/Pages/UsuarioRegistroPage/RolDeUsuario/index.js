import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../Params';

const RolDeUsuario = (props) => {
    const getRoles = () => {
        var data = props.state.rolReducer.data;
        if (!data) {
            if (props.state.rolReducer.estado == "cargando") {
                return <Text>Cargando</Text>
            }
            var object = {
                component: "rol",
                type: "getAll",
                estado: "cargando"
            }
            props.state.socketReducer.session["proyecto"].send(object, true);
            return <View />
        }

        var key_usuario = props.data.key;
        var usuarioRol = props.state.usuarioRolReducer.usuario[key_usuario];
        if (!usuarioRol) {
            if (props.state.usuarioRolReducer.estado == "cargando") {
                return <Text>Cargando</Text>
            }
            var object = {
                component: "usuarioRol",
                type: "getAll",
                estado: "cargando",
                key_usuario: key_usuario
            }
            props.state.socketReducer.session["proyecto"].send(object, true);
            return <View />
        }

        var Lista = Object.keys(data).map((key) => {
            var obj = data[key];
            var isActivo = false;
            if (usuarioRol[key]) {
                var key_nn = usuarioRol[key]
                isActivo = props.state.usuarioRolReducer.data[key_nn];
            }
            return <TouchableOpacity style={{
                width: 200,
                height: 160,
                margin: 8,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#ddd",
            }}
                onPress={() => {
                    if (!isActivo) {
                        var object = {
                            component: "usuarioRol",
                            type: "registro",
                            estado: "cargando",
                            data: {
                                key_rol:key,
                                key_usuario: props.data.key,
                            }
                        }
                        props.state.socketReducer.session["proyecto"].send(object, true);
                    } else {
                        var object = {
                            component: "usuarioRol",
                            type: "anular",
                            estado: "cargando",
                            data: isActivo
                        }
                        props.state.socketReducer.session["proyecto"].send(object, true);
                    }
                    // props.navigation.navigate("PermisoCrearPage", { key: objPermiso.key });
                }}>
                <View style={{
                    flex: 1
                }}>
                    <View style={{
                        padding: 1,
                        width: "100%", height: 120,
                    }}>
                        {props.state.imageReducer.getImage(AppParams.urlImages + "rol/" + obj.key, {})}
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold"
                        }}>{obj.descripcion}</Text>
                    </View>
                </View>
                {(isActivo ? <View /> : <View style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 8,
                    backgroundColor: "#00000099",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text style={{
                        fontSize: 10,
                        color: "#fff"
                    }}>Activar</Text>
                </View>)}
            </TouchableOpacity>
        })
        return <ScrollView horizontal={true}>
            {Lista}
        </ScrollView>
    }

    return <View style={{
        marginTop: 32,
        width: "96%",
        maxWidth: 1080,
        borderRadius: 8,
        backgroundColor: "#fff",
        // padding: 8,
        minHeight: 220,
        marginBottom: 32,

    }}>
        <Text style={{
            padding: 8,
            fontSize: 12,
            color: "#999",
            width: "100%",
            textAlign: "center"
        }}>Roles del usuario</Text>
        {getRoles()}
    </View>
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RolDeUsuario);