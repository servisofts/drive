import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import AppParams from '../../Params';
import Svg from '../../Svg';
import FilePreview from '../CarpetasPage/FilePreview';
import Compartir from './Compartir';
import Seguimiento from './Seguimiento';
import Ventanas from '../../Component/Ventanas';
import Usuarios from './Usuarios';
import SSCrollView from '../../Component/SScrollView';
import EliminarFile from '../../Component/EliminarFile';
import { SPopupOpen, SPopupClose } from '../../SComponent';
class FilePerfil extends Component {

    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            obj: props.navigation.state.params
        };

    }
    getTamanho() {
        if (this.state.obj.tamano) {
            var kbyte = this.state.obj.tamano / 1024
            var tamano_str = kbyte.toFixed(0) + " Kb";
            return tamano_str;
        }
        return "0 Kb";
    }
    getMenuItem = ({ label, icon, onPress }) => {
        return (
            <TouchableOpacity style={{
                padding: 4,
                alignItems: "center",
                justifyContent: "center"
            }} onPress={() => {
                if (onPress) onPress();
            }}>
                <Svg resource={icon} style={{
                    width: 50,
                    height: 50,
                }} />
                <Text style={{ color: "#999", fontSize: 10, textAlign: "center" }}>{label}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        var Select = false;
        var routes = this.props.state.fileReducer.routes;
        var lastPath = { key: "root" };
        if (routes.length > 0) {
            var size = routes.length;
            var lastPath = routes[size - 1];
        }
        Select = this.props.state.fileReducer.data[lastPath.key];
        var curObj = Select[this.state.obj.key];
        if (!curObj) {
            this.props.navigation.goBack();
            return <View />
        }


        return (
            <View style={{
                width: "100%",
                height: "100%",
            }}>
                <BarraSuperior duration={500} title={"Detalle"} navigation={this.props.navigation} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{
                    width: "100%",
                    flex: 1,
                    alignItems: "center",
                }}>
                    <BackgroundImage source={require("../../img/fondos/color/1.jpg")} />
                    {/* <SSCrollView> */}
                    <View style={{
                        width: "100%",
                        minHeight: "95%",
                        borderRadius: 8,
                        maxWidth: 600,
                        overflow: 'hidden',
                        // backgroundColor: "#00000044",
                        alignItems: "center",
                    }}>
                        <SSCrollView>
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
                                }}>
                                    <FilePreview src={AppParams.urlImages + this.state.obj.key} obj={this.state.obj} />
                                </View>
                                <View style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <View style={{
                                        width: "95%",
                                        alignItems: "center",
                                        flexDirection: "row",
                                    }}>
                                        <Text style={{
                                            flex: 5,
                                            fontSize: 20,
                                            fontWeight: "bold",
                                            color: "#fff"
                                        }}>{this.state.obj.descripcion}</Text>
                                        <Text style={{
                                            flex: 2,
                                            fontSize: 14,
                                            textAlign: "right",
                                            color: "#eee"
                                        }}>{this.getTamanho()}</Text>
                                    </View>
                                    <View style={{
                                        width: "95%",
                                        alignItems: "center",
                                        flexDirection: "row"
                                    }}>
                                        <Text style={{
                                            width: "90%",
                                            fontSize: 12,
                                            color: "#bbb"
                                        }}>{new Date(this.state.obj.fecha_on).toLocaleDateString()} {new Date(this.state.obj.fecha_on).toLocaleTimeString()}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                width: "95%",
                                height: 100,
                                borderBottomWidth: 1,
                                borderColor: "#aaa",
                            }}>
                                {/* <Text style={{
                                color: "#fff",
                                fontSize: 11,
                            }}>Acciones</Text> */}
                                <View style={{
                                    width: "100%",
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-evenly"
                                }}>
                                    {this.getMenuItem({
                                        label: "eliminar",
                                        icon: require('../../img/papelera.svg'),
                                        onPress: () => {
                                            SPopupOpen({
                                                key: "acept_eliminar",
                                                content: (< EliminarFile key={"acept_eliminar"} data={this.state.obj} />)
                                            }
                                            );
                                        }
                                    })}
                                    {this.getMenuItem({
                                        label: "compartir",
                                        icon: require('../../img/shared.svg'),
                                        onPress: () => {
                                            SPopupOpen({
                                                key: "compartir",
                                                content: (<Compartir
                                                    key={"compartir"}
                                                    file={curObj}
                                                    close={() => {
                                                        SPopupClose("compartir")
                                                        // this._compartir.setObj(false);
                                                    }} />)
                                            })
                                        }
                                    })}
                                    {this.getMenuItem({
                                        label: "descargar",
                                        icon: require('../../img/download.svg'),
                                        onPress: () => {
                                            this.props.navigation.navigate("DescargaPage", this.state.obj)
                                        }
                                    })}
                                    {this.getMenuItem({
                                        label: "usuarios",
                                        icon: require('../../img/usuarios.svg'),
                                        onPress: () => {
                                            this.props.navigation.navigate("FileUsuariosPage", this.state.obj)
                                        }
                                    })}

                                </View>

                            </View>
                            <View style={{
                                width: "100%",
                                flex: 1,
                                alignItems: "center",
                                // backgroundColor: "#fff"
                            }}>
                                <Seguimiento file={curObj} />
                                {/* <Ventanas ref={(ref) => { this.ventanas = ref }} default={"Usuarios"} ventanas={{
                                Seguimiento: 
                                Usuarios: <Usuarios file={curObj} />
                            }} /> */}
                            </View>

                        </SSCrollView>
                    </View>
                    {/* </SSCrollView> */}
                </View>
            </View >
        );
    }
}


const initStates = (state) => {
    return { state }
};
export default connect(initStates)(FilePerfil);