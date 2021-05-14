import React, { Component } from 'react';
import { View, Text, Animated, PanResponder, Platform, TouchableOpacity, TextInput, Linking, Dimensions } from 'react-native';
import SImage from '../../../../Component/SImage';
import TouchableDouble from '../../../../Component/TouchableDouble';
import AppParams from '../../../../Params';
import Svg from '../../../../Svg';
import FilePreview from '../FilePreview';
const delay = ms => new Promise(res => setTimeout(res, ms));

export default class FileDrag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            isLive: true,
            select: 0,
            scale: this.props.scale,
            panActive: true,
            url: AppParams.urlImages + this.props.obj.key,
            pan: new Animated.ValueXY({ x: props.position.x, y: props.position.y }),
            curpost: { x: (props.position.x / this.props.scale), y: (props.position.y / this.props.scale) }
        }

        this.parametros = {
            useNativeDriver: (Platform.OS != "web"),
        }
        this.createPam();
    }
    verPerfil = async (url) => {

        await delay(300)
        this.props.navigation.navigate("FilePerfil", this.props.obj);
    }
    move(data) {
        Animated.timing(this.state.pan, {
            toValue: { x: data.x, y: data.y },
            duration: 100,
            useNativeDriver: this.parametros.useNativeDriver
        }).start(() => {
        });
    }
    unSelect() {
        this.state.select = 0;
        this.state.isEdit = false;
        this.setState({ ...this.state });
    }
    createPam() {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => ((gestureState.dx < -1 || gestureState.dx > 1) || (gestureState.dy < 0 || gestureState.dy > 0)),
            // onMoveShouldSetPanResponder: (evt, gestureState) => false,
            // onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onPanResponderGrant: () => {
                this.lastPosition = {
                    x: this.state.pan.x._value,
                    y: this.state.pan.y._value
                }
                this.props.scrollView.setNativeProps({ scrollEnabled: false })
                this.timePanIn = new Date().getTime();
                // console.log("enter");
                this.state.pan.flattenOffset();
                this.state.pan.setOffset({
                    x: this.state.pan.x._value,
                    y: this.state.pan.y._value
                });

            },
            onPanResponderMove: (evt, gs) => {
                // this.props.scrollView.scrollTo({ x: 0, y: 0, animated: true })
                this.state.pan.setValue({ x: gs.dx, y: gs.dy });
            },
            onPanResponderRelease: () => {
                this.props.scrollView.setNativeProps({ scrollEnabled: true })
                // Animated.timing(this.state.pan, {
                //     toValue:  this.lastPosition,
                //     duration: 100,
                //     useNativeDriver: this.parametros.useNativeDriver
                // }).start(() => {
                // });
                // Animated.timing(this.state.pan, {
                //     toValue: { x: 0, y: 0 },
                //     duration: 100,
                //     useNativeDriver: this.parametros.useNativeDriver
                // }).start(() => {
                //     // this.state.pan.flattenOffset();
                // });
                // console.log("x:" + this.state.pan.x._value + " y:" + this.state.pan.y._value)
            },
            onPanResponderEnd: () => {

                this.props.scrollView.setNativeProps({ scrollEnabled: true })
                this.timePanEnd = new Date().getTime();
                // console.log("x:" + this.state.pan.x._value + " y:" + this.state.pan.y._value)
                var time = this.timePanEnd - this.timePanIn;
                var force = (this.state.pan.x._value + this.state.pan.y._value) / 2 / time;

                if (force > 0.7) {
                    console.log(force);
                    this.state.pan.setValue({ x: 0, y: 0 });
                    // Animated.timing(this.state.pan, {
                    //     toValue: { x: 0, y: 0 },
                    //     duration: 0,
                    //     useNativeDriver: this.parametros.useNativeDriver
                    // }).start(() => {
                    //     this.state.pan.flattenOffset();
                    // });
                }
                this.setState({
                    curpost: {
                        x: (this.state.pan.x._value / this.state.scale) + this.state.curpost.x,
                        y: (this.state.pan.y._value / this.state.scale) + this.state.curpost.y
                    }
                })
                // Animated.timing(this.state.pan, {
                //     toValue: { x: 0, y: 0 },
                //     duration: 100,
                //     useNativeDriver: this.parametros.useNativeDriver
                // }).start(() => {
                //     this.state.pan.flattenOffset();
                // });
                // this.state.pan.flattenOffset();
                // this.state.position.x=this.state.pan.x._value;
                // this.state.position.y=this.state.pan.y._value;
                // this.setState({...this.state});
                // this.setState({ position: this.state.pan.getLayout() })
                // this.state.pan.setValue({ x: 0, y: 0 })
                // this.createPam()
            },
        });
    }
    onPress() {
        if (this.state.select == 0) {
            this.setState({ select: 1 })
            // Animated.timing(this.state.select, {
            //     toValue: this.state.select._value == 0 ? 1 : 0,
            //     duration: 10,
            //     useNativeDriver: this.parametros.useNativeDriver
            // }).start(() => { });
        } else {
            this.setState({ isEdit: !this.state.isEdit })
        }
    }
    getName() {
        if (this.state.isEdit) {
            return (
                <TextInput style={{
                    width: "100%",
                    fontSize: 12 * this.state.scale,
                    padding: 0,
                    flex: 1,
                    textAlign: "center",
                    color: "#fff",
                    backgroundColor: "transparent"
                }}
                    onBlur={() => {
                        this.unSelect()
                    }}
                    selectTextOnFocus={true}
                    multiline={true}
                    numberOfLines={5}
                    autoFocus={true}
                    defaultValue={this.props.obj.descripcion}
                    onChangeText={(text) => {
                        this.newName = text;
                    }}
                />
            )
        } else {

            return (
                <Text style={{
                    height: "100%",
                    color: "#fff",
                    fontSize: 12 * this.state.scale,
                    textAlign: "center",
                    padding: 4 * this.state.scale,
                    textAlignVertical: "top",
                    flexWrap: "wrap"
                }}> {this.props.obj.descripcion.split(".").map((sec, i) => {
                    if (this.props.obj.descripcion.split(".").length - 1 == 0) {
                        return sec;
                    }
                    if (this.props.obj.descripcion.split(".").length - 1 == i) {
                        return "";
                    }
                    return sec;
                })}</Text>
            )
        }

    }
    getPosition() {
        return (
            <Text style={{ width: "98%", color: "#fff", fontSize: 13*this.state.scale, textAlign: "center", flex: 1, maxHeight: 40 ,position:"absolute"}}>
                {"x:" + this.state.curpost.x.toFixed(0) + "\ny:" + this.state.curpost.y.toFixed(0)}
            </Text>
        )
    }
    getSize() {
        var byte = this.props.obj.tamano;
        var kbyte = byte / 1024
        var tamano_str = kbyte.toFixed(0) + " Kb";
        return (
            <Text style={{ width: "98%", color: "#fff", fontSize: 8, textAlign: "center", flex: 1, maxHeight: 40 }}>
                {tamano_str}
            </Text>
        )
    }
    getPreview() {
        return <FilePreview src={this.state.url} obj={this.props.obj} />
    }
    render() {
        if (!this.state.isLive) {
            return <View />
        }
        if (!this.props.obj) {
            return <View />
        }
        if (!this.state.isEdit) {
            if (this.newName && this.newName != this.props.obj.descripcion) {
                this.props.obj.descripcion = this.newName;
                this.props.editarNombre(this.props.obj);
            }
        }
        return (

            <Animated.View
                {...this.panResponder.panHandlers}
                style={{
                    margin: 4,
                    width: (90 * this.state.scale),
                    height: (110 * this.state.scale),
                    position: "absolute",
                    top: 0,
                    left: 0,
                    // borderWidth: 1,
                    borderRadius: 4 * this.state.scale,
                    // borderColor: "#ddd",
                    backgroundColor: (this.state.select == 0 ? "#00000000" : "#ffffff66"),
                    transform: [
                        { translateX: this.state.pan.x },
                        { translateY: this.state.pan.y }
                    ]
                }} onLayout={(event) => {
                    this.setState({ position: event.nativeEvent.layout })
                }}>
                <TouchableDouble style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }} onSinglePress={() => {
                    this.onPress()
                }} onDoublePress={() => {
                    // alert(this.props.obj.tipo)
                    if (this.props.obj.tipo == 0) {
                        this.props.moveFolder(this.props.obj);
                    } else {
                        if (Platform.OS == "web") {
                            window.open(this.state.url)
                        } else {
                            Linking.openURL(this.state.url)
                        }
                    }
                }}
                    onLongPress={() => {
                        this.verPerfil()
                    }}
                >
                    <View style={{
                        width: "90%",
                        height: 75 * this.state.scale,
                        marginTop: 4 * this.state.scale,
                        padding: 4 * this.state.scale,
                        borderRadius: 8 * this.state.scale,
                        borderColor: "#ddd",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden"
                    }}>
                        {this.getPreview()}
                    </View>
                    <View style={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        // backgroundColor:"#000"
                    }}>
                        {this.getName()}
                        {/* {this.getSize()} */}
                        {/* {this.getPosition()} */}
                    </View>


                </TouchableDouble>
            </Animated.View>
        );
    }
}
