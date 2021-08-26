import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import ProgressCircle from '../../Component/ProgressCircle';
import STextImput from '../../Component/STextImput';
import Svg from '../../Svg';
import DescargaProgres from './DescargaProgres';
import SFetchBlob from '../../Component/SFetchBlob';
import AppParams from '../../Params';
import { connect } from 'react-redux';
import FilePreview from '../CarpetasPage/FilePreview';
class DescargaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        if (!this.props.navigation.state) {
            this.props.navigation.goBack();
            return <View />
        }
        this.props.state.usuarioReducer.cancelarDescarga = false
        var controller = new AbortController();
        var signal = controller.signal;
        var dataCancelar = {
            cancelarfuction: this.props.state.usuarioReducer.cancelarDescargas = () => {
                this.props.state.usuarioReducer.cancelarDescarga = true
                this.state.cancelar = this.props.state.usuarioReducer.cancelarDescarga
                this.setState({ ...this.state })
            },
            controller,
            estado: this.props.state.usuarioReducer.cancelarDescarga
        }
        var params = this.props.navigation.state.params;
        this.data = params;
        this.state = {
            dataCancelar,
            _url: new STextImput({
                defaultValue: AppParams.urlImages + params.key,
                style: {
                    width: "90%",
                    height: 40,
                    borderRadius: 4,
                    backgroundColor: "#ffffffaa",
                    textAlign: "center"
                }
            })
        };
    }
    getName(name) {
        if (!name) return "";
        // if (name.length > 20) return name.substring(0, 30) + "...";
        return name;
    }
    getTamano(tamano) {
        var size = "--";
        if (tamano > 0) {
            var byte = tamano;
            var kbyte = byte / 1024;
            var Mg = kbyte / 1024;
            var Gb = Mg / 1024;

            if (Gb > 1) {
                size = Gb.toFixed(1) + " GB"
            } else if (Mg > 1) {
                size = Mg.toFixed(1) + " MB"
            } else if (kbyte > 1) {
                size = kbyte.toFixed(0) + " KB"
            } else if (byte > 1) {
                size = byte + " B"
            }

        }
        return size;
    }
    render() {

        return (
            <View style={{
                width: "100%",
                flex: 1,
            }}>
                <BarraSuperior title={"Descarga."} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{
                    flex: 1,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center"

                }}>
                    <BackgroundImage source={require("../../img/fondos/color/1.jpg")} />
                    <View style={{
                        width: "90%",
                        borderRadius: 8,
                        height: "90%",
                        maxWidth: 500,
                        padding: 8,
                        backgroundColor: "#ffffff44",
                        alignItems: "center",
                        overflow: "hidden"
                    }}>
                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",

                        }}>
                            <View style={{
                                width: 70,
                                height: 70,
                                borderRadius: 4,
                                overflow: 'hidden',
                            }}>
                                <FilePreview src={AppParams.urlImages + this.data.key} obj={this.data} />
                            </View>
                            <View style={{
                                flex: 1,
                                height: "100%",
                                justifyContent: "center",
                                paddingStart: 8,
                                // alignItems:"center",
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: "#fff",
                                    // textAlign: "center"
                                }}>{this.getName(this.data.descripcion)}</Text>
                                <Text style={{
                                    fontSize: 12,
                                    color: "#aaa",
                                    // textAlign: "right"
                                }}>{this.getTamano(this.data.tamano)}</Text>
                            </View>
                        </View>

                        {/* {this.state._url.getComponent()} */}
                        <DescargaProgres
                            cancelar={this.state.dataCancelar}
                            descargar={() => {
                                var url = this.state._url.getValue();
                                new SFetchBlob().descargar({ cancelar: this.state.dataCancelar, url: url, ...this.props.navigation.state.params, key_usuario: this.props.state.usuarioReducer.usuarioLog.key }, (evt) => {
                                    // console.log(progres)
                                    this._progress.animateTo(1 - evt.porcent, 1, evt);
                                });
                            }}
                            ref={(ref) => {
                                this._progress = ref;
                            }} />

                    </View>
                </View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(DescargaPage);