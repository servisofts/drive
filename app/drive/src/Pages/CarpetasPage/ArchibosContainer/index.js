import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, BackHandler, Platform, Dimensions, } from 'react-native';
import { connect } from 'react-redux';
import SNestedScrollView from '../../../Component/SNestedScrollView';
import AppParams from '../../../Params';
import FileDrag from './FileDrag';

const fondos = [
    require("../../../img/fondos/ss.jpg"),
    require("../../../img/fondos/color/1.jpg"),
    require("../../../img/fondos/color/2.jpg"),
    require("../../../img/fondos/tecno/1.jpg"),
    require("../../../img/fondos/tecno/2.jpg"),
    require("../../../img/fondos/tecno/3.jpg"),

]
class ArchibosContainer extends Component {
    constructor(props) {
        super(props);
        var ratio = (Dimensions.get("window").width / Dimensions.get("window").height);
        // var ratio = 0.5;
        
        this.state = {
            scale: ratio,
        };
    }
    backAction = () => {
        // if (props.onClose) { props.onClose() }
        this.props.dispatch({
            component: "file",
            type: "backFolder",
            estado: "cargando",
        })
        console.log("ACTION BACK")
        return true;
    };
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }
    getDetail() {
        return <View style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
            alignItems: "center"
        }}>
            <Text style={{ color: "#fff" }}> Archibos container </Text>
            <Text style={{ color: "#fff" }}> {JSON.stringify(this.state.dimensiones)}</Text>
        </View>
    }

    editarNombre(obj) {
        var object = {
            component: "file",
            type: "editar",
            path: this.props.state.fileReducer.routes,
            data: obj,
            estado: "cargando",
        }
        // alert(JSON.stringify(object));
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    }
    getFiles() {
        if (!this.state.dimensiones) {
            return <View />
        }
        // console.log(this.state.dimensiones)
        var dataFinal = {};
        var data = this.props.state.fileReducer.data;
        if (!data) {
            if (this.props.state.fileReducer.estado == "cargando") {
                return <View />
            }
            var object = {
                component: "file",
                type: "getAll",
                estado: "cargando",
            }
            // alert(JSON.stringify(object));
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        }
        dataFinal = data;
        var routes = this.props.state.fileReducer.routes;
        if (routes.length > 0) {
            routes.map((curRoute, key1) => {
                dataFinal = dataFinal[curRoute.key].data;
                if (!dataFinal) {
                    if (this.props.state.fileReducer.estado == "cargando") {
                        return <View />
                    }
                    var object = {
                        component: "file",
                        type: "getAll",
                        estado: "cargando",
                        path: routes
                    }
                    // alert(JSON.stringify(object));
                    this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                }

            })

        }

        if (!dataFinal) {
            return <View />
        }
        if (Object.keys(dataFinal).length <= 0) {
            return <View />
        }
        var size = 110 * this.state.scale;
        var margin = 5 * this.state.scale;
        var i = 0;
        var x = 0 + margin;
        var y = 0 + margin;

        var limit = parseInt((this.state.dimensiones.width / size) - 0);
        // alert(limit)
        this._fileDrag = {};
        // console.log(dataFinal)
        return Object.keys(dataFinal).map((key) => {
            var obj = dataFinal[key];
            if (i % limit == 0) {
                if (i != 0) {
                    y += size + margin;
                }
                x = margin;
            } else {
                x += size;
            }
            i++;
            return (<FileDrag ref={(ref) => {
                this._fileDrag[key] = ref;
            }} obj={obj} position={{ x, y }}
                editarNombre={(obj) => {
                    this.editarNombre(obj);
                }}
                layoutParent={this.state.dimensiones}
                scale={this.state.scale}
                navigation={this.props.navigation}
                scrollView={this._scrollView}
                moveFolder={(obj) => {
                    this.props.dispatch({
                        component: "file",
                        type: "moveFolder",
                        data: obj,
                        estado: "cargando",
                    })

                }}
            />)
        });
    }
    onLayout(event) {
        this.state.dimensiones = event.nativeEvent.layout;
        var ratio = (Dimensions.get("window").width / Dimensions.get("window").height);
        this.setState({
            dimensiones: this.state.dimensiones,
            scale: ratio,
        })
        if (!this.state.dimensiones) {
            return <View />
        }

    }
    render() {
        return (
            <View style={{
                flex: 1,
                width: "100%",
            }}>
                <View style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute"
                }}>
                    <SNestedScrollView
                        ref={(ref) => { this._scrollView = ref }}
                        style={{
                            //   backgroundColor:"#000"
                        }}
                        width={800 * this.state.scale}
                        height={2000 * this.state.scale}
                        backgroundImage={fondos[5]}
                        onLayout={(event) => {
                            this.onLayout(event)
                        }}>

                        <TouchableWithoutFeedback onPress={() => {
                            Object.keys(this._fileDrag).map((key) => {
                                this._fileDrag[key].unSelect();
                            })
                        }}>
                            <View style={{
                                width: "100%",
                                height: "100%",
                            }}>
                                {this.getFiles()}
                            </View>
                        </TouchableWithoutFeedback>

                    </SNestedScrollView>
                </View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ArchibosContainer);