import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../Params';
import STheme from '../../../STheme';
import Svg from '../../../Svg';
import BtnAcceso from './BtnAcceso';

class Accesos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getAjustes = () => {
        return <View style={{
            width: Dimensions.get("window").width / 4,
            maxWidth: 180,
            height: (Dimensions.get("window").width / 4) + 20,
            maxHeight: 200,
            padding: 8,
        }}>
            <TouchableOpacity style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
            }} onPress={() => {
                this.props.navigation.navigate("AjustesPage");
            }}>
                <View style={{
                    width: (Dimensions.get("window").width / 4) - 20,
                    height: (Dimensions.get("window").width / 4) - 20,
                    maxWidth: 160,
                    maxHeight: 160,
                    borderRadius: 8,
                    // backgroundColor: STheme.color.card,
                }}>
                    <Svg resource={require("../../../img/ajustes.svg")} />
                </View>
                <Text style={{
                    color: STheme.color.text,
                    fontSize: 10 * ((Dimensions.get("window").width + Dimensions.get("window").height) / 2) * 0.0015,
                    textAlign: "center"
                }}>Ajustes</Text>
            </TouchableOpacity>

        </View>
    }

    getListaPaginas = () => {
        var permisos = this.props.state.usuarioPageReducer.data;
        if (!permisos) {
            if (this.props.state.usuarioPageReducer.estado == "cargando") {
                return <View />;
            }
            // console.log(this.props.state.usuarioReducer.usuarioLog.key)
            var object = {
                component: "usuarioPage",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <View />;
        }
        return Object.keys(permisos).map((key) => {
            var obj = permisos[key];
            if (obj.estado == 0) {
                return <View />
            }
            if (!obj.is_page) {
                return <View />
            }
            var urlImage = AppParams.servicios["roles_permisos"] + "page/" + obj.key;
            return <View style={{
                width: Dimensions.get("window").width / 4,
                maxWidth: 180,
                height: (Dimensions.get("window").width / 4) + 20,
                maxHeight: 180,
                padding: 8,
            }}>
                <TouchableOpacity style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                }} onPress={() => {
                    this.props.navigation.navigate(obj.url);
                }}>
                    <View style={{
                        width: (Dimensions.get("window").width / 4) - 20,
                        height: (Dimensions.get("window").width / 4) - 20,
                        maxWidth: 160,
                        maxHeight: 160,
                        borderRadius: 8,
                        // backgroundColor: STheme.color.card,
                    }}>
                        {this.props.state.imageReducer.getImage(urlImage, {})}
                    </View>
                    <Text style={{
                        color: STheme.color.text,
                        fontSize: 10 * ((Dimensions.get("window").width + Dimensions.get("window").height) / 2) * 0.0015,
                        textAlign: "center"
                    }}>{obj.descripcion}</Text>
                </TouchableOpacity>

            </View>
        })
    }

    render() {
        return (
            <View style={{
                width: "100%",
                height: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                // justifyContent: "center",
                alignItems: "flex-start"
            }}>
                {/* {this.getListaPaginas()} */}
                <BtnAcceso
                    label={"Drive"}
                    icon={<Svg resource={require('../../../img/files.svg')} />}
                    onPress={() => {
                        this.props.state.fileReducer.activeRoot = this.props.state.fileReducer.root["raiz"]
                        this.props.navigation.navigate("CarpetasPage");
                    }}
                />
                <BtnAcceso
                    label={"Compartidos"}
                    icon={<Svg resource={require("../../../img/shared.svg")} />}
                    onPress={() => {
                        // this.props.state.fileReducer.activeRoot = this.props.state.fileReducer.root["shared"]
                        this.props.navigation.navigate("CompartidosPage");
                    }}
                />
                <BtnAcceso
                    label={"Papelera"}
                    icon={<Svg resource={require("../../../img/papelera.svg")} />}
                    onPress={() => {
                        this.props.state.fileReducer.activeRoot = this.props.state.fileReducer.root["trash"]
                        this.props.navigation.navigate("CarpetasPage");
                    }}
                />
                <BtnAcceso
                    label={"Notificaciones"}
                    icon={<Svg resource={require("../../../img/notify.svg")} style={{ fill: "#fff" }} />}
                    onPress={() => {
                        this.props.navigation.navigate("NotificacionPage");
                    }}
                />
                <BtnAcceso
                    label={"Ajustes"}
                    icon={<Svg resource={require("../../../img/ajustes.svg")} />}
                    onPress={() => {
                        this.props.navigation.navigate("AjustesPage");
                    }}
                />
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Accesos);