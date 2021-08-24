import React, { Component } from 'react'

import { Text, TouchableOpacity, View } from 'react-native'
import { SPopupOpen, SPopupClose, SText, SView, SScrollView2 } from '../../../SComponent'
import Svg from '../../../Svg'
import * as SSStorage from '../../../SSStorage';
const Empresas = {
    servisofts: {
        key: "servisofts",
        name: "Servisofts SRL",
        icon: "logo",
        host: "drive.servisofts.com"
    },
    icysmedical: {
        key: "icysmedical",
        name: "Icys Medical",
        icon: "IcysMedical",
        host: "xxxx.com"
    },
}

export default class Server extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: "servisofts",
        }

    }
    componentDidMount() {
        SSStorage.getItem("serverSelect", (value) => {
            if (value) {
                this.setState({ selected: value })
            }
        });
    }
    getLista() {
        return Object.keys(Empresas).map((key) => {
            var item = Empresas[key];
            return <TouchableOpacity style={{
                width: "100%",
                height: 70,
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#fff",
                flexDirection: "row"
            }} onPress={() => {
                this.setState({ selected: key })
                SSStorage.setItem("serverSelect", key);
                SPopupClose("selectServer")
            }}>
                <View style={{
                    width: 100,
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderRadius: 4,
                }}>
                    <Svg name={item.icon} style={{
                        width: 90,
                        height: 60,
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: "#000",
                    }}>{item.name}</Text>
                    <Text style={{
                        color: "#666",
                        fontSize: 10,
                    }}>{item.host}</Text>
                </View>
            </TouchableOpacity>
        })
    }
    getSelect() {
        return <View style={{
            width: "100%",
            width: 400,
            maxWidth: "100%",
            height: 500,
            maxHeight: "100%",
            backgroundColor: "#fffffff0",
            borderRadius: 8,
            overflow: "hidden"
        }}>
            <SScrollView2 disableHorizontal style={{
                width: "100%",
            }}>
                {this.getLista()}
            </SScrollView2>
        </View>
    }
    render() {
        var select = Empresas[this.state.selected];
        return (
            <SView props={{
                col: "xs-11 sm-9 md-8 lg-6 xl-4",
            }} style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <SText style={{
                    color: "#666"
                }}>Selecciona tu empresa!</SText>
                <SView props={{
                    col: "xs-10"
                }} style={{
                    height: 40,
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: "#666",
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={() => {
                    SPopupOpen({
                        key: "selectServer",
                        content: this.getSelect()
                    })
                }}>
                    <SText style={{
                        fontSize: 16,
                    }}>{select.name}</SText>
                </SView>
            </SView>
        )
    }
}
