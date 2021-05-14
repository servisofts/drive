import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import FilePreview from '../CarpetasPage/ArchibosContainer/FilePreview';
import AppParams from '../../Params';
import Svg from '../../Svg';

export default class FilePerfil extends Component {

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
    render() {

        return (
            <View style={{
                width: "100%",
                height: "100%",
            }}>
                <BarraSuperior duration={500} title={"Ajuste de archibo"} goBack={() => {
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
                                    flex: 1,
                                    alignItems: "center",
                                    flexDirection: "row"
                                }}>
                                    <Text style={{
                                        width: "90%",
                                        fontSize: 12,
                                        color: "#bbb"
                                    }}>Creado: {new Date(this.state.obj.fecha_on).toLocaleDateString()} {new Date(this.state.obj.fecha_on).toLocaleTimeString()}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            width: "95%",
                            height: 60,
                            borderBottomWidth: 1,
                            borderColor: "#aaa",
                        }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 11,
                            }}>Acciones</Text>
                            <View style={{
                                width: "100%",
                                flex: 1,
                                flexDirection: "row",
                            }}>
                                <TouchableOpacity style={{
                                    padding:4,
                                }}>
                                    <Svg resource={require('../../img/delete.svg')} style={{
                                        width: 50,
                                        height:"100%",
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    padding:4,
                                }}>
                                    <Svg resource={require('../../img/shareFolder.svg')} style={{
                                        width: 50,
                                        height: "100%",
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    padding:4,
                                }}>
                                    <Svg resource={require('../../img/download.svg')} style={{
                                        width: 50,
                                        height: "100%",
                                    }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
