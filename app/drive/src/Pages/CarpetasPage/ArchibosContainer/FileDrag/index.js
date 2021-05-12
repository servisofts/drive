import React, { Component } from 'react';
import { View, Text, Animated, PanResponder, Platform, TouchableOpacity } from 'react-native';
import FilePreview from '../FilePreview';

export default class FileDrag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: { x: props.position.x, y: props.position.y },
            pan: new Animated.ValueXY({ x: 0, y: 0 })
        };
        this.parametros = {
            useNativeDriver: (Platform.OS != "web"),
        }
        this.createPam();
    }
    createPam() {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dx < -1 || gestureState.dx > 1,
            // onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onPanResponderGrant: () => {
                this.timePanIn = new Date().getTime();
                // console.log("enter");
                // this.state.pan.setOffset({
                //     x: 0,
                //     y: 0
                // });
            },
            onPanResponderMove: Animated.event([
                null,
                { dx: this.state.pan.x, dy: this.state.pan.y }
            ]),
            onPanResponderRelease: () => {
                // Animated.timing(this.state.pan, {
                //     toValue: { x: 0, y: 0 },
                //     duration: 100,
                //     useNativeDriver: this.parametros.useNativeDriver
                // }).start(() => {
                //     this.state.pan.flattenOffset();
                // });
                // this.state.pan.flattenOffset();

            },
            onPanResponderEnd: () => {
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
                this.createPam()
            },
        });
    }
    render() {
        var url = "http://192.168.0.199:30017/" + this.props.obj.descripcion;
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={{
                    margin: 4,
                    width: 80,
                    height: 80,
                    position: "absolute",
                    top: this.state.position.y,
                    left: this.state.position.x,
                    // borderWidth: 1,
                    // borderRadius: 8,
                    // borderColor: "#ddd",
                    transform: [
                        { translateX: this.state.pan.x },
                        { translateY: this.state.pan.y }
                    ]
                }} onLayout={(event) => {
                    this.setState({ position: event.nativeEvent.layout })
                }}>
                <TouchableOpacity style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }} onPress={() => {
                    // alert(this.props.obj.key)
                    if (this.props.obj.tipo != 0) {
                        window.open(url)
                    }else{
                        alert("folder")
                    }
                }}>
                    <View style={{
                        width: "80%",
                        height: "80%",
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: "#ddd",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden"
                    }}>
                        {this.props.obj.tipo != 0 ? <FilePreview src={url} /> : <View />}
                    </View>
                    {/* <Text style={{ color: "#fff" }}> {JSON.stringify(this.state.position)} </Text> */}
                    <Text style={{ color: "#fff", fontSize: 10, textAlign: "center", height: "20%" }}> {this.props.obj.descripcion} </Text>

                </TouchableOpacity>
            </Animated.View>
        );
    }
}
