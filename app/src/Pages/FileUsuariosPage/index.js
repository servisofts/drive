import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Usuarios from './Usuarios';
import BarraSuperior from '../../Component/BarraSuperior/index';
import BackgroundImage from '../../Component/BackgroundImage/index';
import SSCrollView from '../../Component/SScrollView/index';
import FilePreview from '../CarpetasPage/FilePreview/index';
import AppParams from '../../Params/index';

export default class FileUsuariosPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
        this.data = props.navigation.state.params;
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
                flex: 1,
                width: '100%',
            }}>
                <BarraSuperior duration={500} title={"Permisos de usuarios"} navigation={this.props.navigation} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{
                    width: "100%",
                    flex: 1,
                    alignItems: "center",
                }}>
                    <BackgroundImage />
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
                                    <FilePreview src={AppParams.urlImages + this.data.key} obj={this.data} />
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
                                        }}>{this.data.descripcion}</Text>
                                        <Text style={{
                                            flex: 2,
                                            fontSize: 14,
                                            textAlign: "right",
                                            color: "#eee"
                                        }}>{this.getTamano(this.data.tamano)}</Text>
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
                                        }}>{new Date(this.data.fecha_on).toLocaleDateString()} {new Date(this.data.fecha_on).toLocaleTimeString()}</Text>
                                    </View>
                                </View>

                            </View>
                            <Usuarios file={this.data} />
                        </SSCrollView>
                    </View>

                </View>
            </View>
        );
    }
}
