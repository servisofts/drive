import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Params';
import Svg from '../../Svg';
import SImage from '../SImage';

class BarraSuperior extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0),
        };

    }

    startAnimation() {
        Animated.timing(this.state.anim, {
            toValue: 100,
            duration: !this.props.duration ? 1000 : this.props.duration,
        }).start();
    }
    componentDidMount() {

        this.startAnimation();
    }

    getUser() {
        if (!this.props.state.usuarioReducer.usuarioLog) {
            return <View />
        }
        return (<>
            <View style={{
                width: 50,
                height: "100%",
                justifyContent: "center",
                borderBottomEndRadius: 30,
                overflow: "hidden",
                // alignItems:"center"
                // backgroundColor: "#fff"
            }}>
                <TouchableOpacity style={{
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "#ffffff22",
                }} onPress={() => {
                    this.props.navigation.navigate("UsuarioPerfilPage")
                }}>

                    {this.props.state.imageReducer.getImage(AppParams.urlImages + this.props.state.usuarioReducer.usuarioLog.key, {
                        width: "100%",
                        height: "100%",
                    })}
                    {/* <SImage source={require("../../img/postgres.png")} style={{
                        width: "90%",
                        height: "90%",
                        resizeMode: "contain"
                    }} /> */}

                </TouchableOpacity>
            </View>
            <View style={{
                position: "absolute",
                bottom: 2,
                right: 2,
                width: 14,
                height: 14,
                borderRadius: 100,
                backgroundColor: "#090"
            }}>
            </View>
        </>
        )
    }
    getTitle() {
        var text = this.props.state.fileReducer.activeRoot.descripcion+"/"
        if (this.props.title) {
            text = this.props.title;
        } else {
            if (this.props.state.fileReducer.routes) {
                var size = this.props.state.fileReducer.routes.length
                this.props.state.fileReducer.routes.map((obj, key) => {
                    if (size - (key + 1) > 0) {
                        // if (size > 2) {
                        //     if (key < 1) {
                        //         text += obj.descripcion.substring(0, 5) + "..."
                        //     }else{
                        text += "."
                        //     }
                        // } else {
                        //     text += obj.descripcion.substring(0, 5) + "..."
                        // }
                        text += "/"
                    } else {
                        text += obj.descripcion+"/"
                    }

                });
            }
        }
        return (<Text style={{
            color: "#fff",
            fontSize: 12,
            fontWeight: "bold"
        }}>{text}</Text>)
    }
    render() {
        return (
            <Animated.View style={{
                width: "100%",
                height: 45,
                flexDirection: "row",
                backgroundColor: "#fff",
                transform: [
                    {
                        translateX: this.state.anim.interpolate({
                            inputRange: [0, 100],
                            outputRange: [Dimensions.get("window").width * -1, 0]
                        })
                    }
                ]
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: "#000",
                    borderBottomEndRadius: 30,
                    borderWidth: 1,
                    borderColor: "#000",
                    // overflow: "hidden",
                }}>
                    <TouchableOpacity style={{
                        width: 45,
                        height: "100%",
                        backgroundColor: "#000",
                        justifyContent: "center",
                        alignItems: "center",
                    }} activeOpacity={0.9} onPress={this.props.goBack}>
                        {!this.props.goBack ? <View /> : <Svg resource={require('../../img/arrow.svg')}
                            style={{
                                width: "50%",
                                height: "50%",
                                fill: "#fff"
                            }} />}

                    </TouchableOpacity>
                    <View style={{
                        flex: 1,

                        justifyContent: "center",
                        // alignItems: "center"
                    }}>
                        {this.getTitle()}

                    </View>
                    {this.getUser()}


                </View>

                <TouchableOpacity style={{
                    width: 130,
                    height: "100%",
                    padding: 4,
                }} onPress={() => {
                    this.props.navigation.navigate("InicioPage")
                }}>
                    <Svg name="logo" style={{
                        with: "100%",
                        height: "100%",
                        fill: "#000"
                    }} />
                </TouchableOpacity>
            </Animated.View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(BarraSuperior);