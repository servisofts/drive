import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, BackHandler, Platform, Dimensions, ActivityIndicator, } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../../Component/BackgroundImage';
import DropFileView, { uploadHttp } from '../../../Component/DropFileView';
import SNestedScrollView from '../../../Component/SNestedScrollView';
import { getFilesInPath, getPermisoFile, getPosicionDisponible } from '../../../FileFunction';
import AppParams from '../../../Params';
import FileDrag from './FileDrag';
import { getPermisos } from '../../../FileFunction/index';

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
            scale: this.props.scaleGlobal,
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

    editarGrupo(grupo) {
        var object = {
            component: "file",
            type: "editarGrupo",
            estado: "cargando",
            tipo_seguimiento: "cambiar_posicion",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            data: grupo,
            path: this.props.state.fileReducer.routes
        }
        // alert(JSON.stringify(object));
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    }
    ordenar() {
        if (!this._fileDrag) {
            return;
        }
        var arr = Object.keys(this._fileDrag).map((key) => {
            var filed: FileDrag = this._fileDrag[key];
            if (!filed) return;
            return { ...filed.getPositionJson(), key: key };
        })
        arr.sort(function (a, b) {
            if ((a.pan.x * a.pan.y) + (a.obj.x * a.obj.y) > (b.pan.x * b.pan.y) + (b.obj.x * b.obj.y)) {
                return 1;
            }
            if ((a.pan.x * a.pan.y) + (a.obj.x * a.obj.y) < (b.pan.x * b.pan.y) + (b.obj.x * b.obj.y)) {
                return -1;
            }
            return 0;
        });

        var size = 110 * this.state.scale;
        var margin = 5 * this.state.scale;
        var i = 0;
        var x = 0 + margin;
        var y = 0 + margin;
        var ArrEdit = arr.map((objIten) => {
            if (x + (size + margin) > this.state.dimensiones.width) {
                y += size + margin;
                x = 0 + margin;
            }
            if (!this._fileDrag) return;
            if (!objIten) return;
            var filed: FileDrag = this._fileDrag[objIten.key];
            if (!filed) return;
            var objResp = { ...filed.getObj(), posx: x / this.state.scale, posy: y / this.state.scale };
            filed.move({ x: x, y: y })
            x += size + margin;
            return objResp;
        });
        this.editarGrupo(ArrEdit);

    }
    actualizarPosicion = (props) => {
        var object = {
            component: "file",
            type: "mover",
            estado: "cargando",
            tipo_seguimiento: "cambiar_posicion",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            data: props,
            path: this.props.state.fileReducer.routes
        }
        // alert(JSON.stringify(object));
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    }
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
            tipo_seguimiento: "cambiar_nombre",
            path: this.props.state.fileReducer.routes,
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
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
        var dataFinal = getFilesInPath(this.props);

        if (!dataFinal) {
            return <ActivityIndicator color={"#fff"} />
        }
        if (Object.keys(dataFinal).length <= 0) {
            return <Text>Vacio</Text>
        }
        var permisos = getPermisos(this.props, Object.keys(dataFinal));
        this.datafinal = dataFinal;
        var size = 110 * this.state.scale;
        var margin = 5 * this.state.scale;
        var i = 0;
        var x = 0 + margin;
        var y = 0 + margin;

        var limit = parseInt((this.state.dimensiones.width / size) - 0);
        // alert(limit)
        if (!this._fileDrag) {
            this._fileDrag = {};
        }
        // console.log(dataFinal)
        return Object.keys(dataFinal).map((key) => {
            var obj = dataFinal[key];
            // if (i % limit == 0) {
            //     if (i != 0) {
            //         y += size + margin;
            //     }
            //     x = margin;
            // } else {
            //     x += size;
            // }
            // i++;
            // var post = { x: x, y: y };

            // if (obj.posx && obj.posy) {
            //     post = { x: obj.posx * this.state.scale, y: obj.posy * this.state.scale };
            // }
            var post = { x: 0, y: 0 };
            if (obj.posx && obj.posy) {
                post = { x: obj.posx * this.state.scale, y: obj.posy * this.state.scale };
            }

            return (<FileDrag ref={(ref) => {
                this._fileDrag[key] = ref;
            }} obj={obj} position={post}
                editarNombre={(obj) => {
                    this.editarNombre(obj);
                }}
                permisos={getPermisoFile(this.props, key)}
                actualizarPosicion={(obj) => { this.actualizarPosicion(obj) }}
                layoutParent={this.state.dimensiones}
                scale={this.state.scale}
                navigation={this.props.navigation}
                scrollView={this._scrollView}
                moveFolder={(obj) => {
                    this.props.dispatch({
                        component: "file",
                        type: "moveFolder",
                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                        data: obj,
                        estado: "cargando",
                    })

                }}
                onSelect={(key) => {
                    Object.keys(this._fileDrag).map((keyRef) => {
                        if (key == keyRef) {
                            return;
                        }
                        if (this._fileDrag[keyRef]) {
                            this._fileDrag[keyRef].setSelect(false)

                        }
                    })
                }}
            />)
        });
    }
    onLayout(event) {
        this.state.dimensiones = event.nativeEvent.layout;
        this.setState({
            dimensiones: this.state.dimensiones,
            scale: this.state.scale,
        })
        if (!this.state.dimensiones) {
            return <View />
        }

    }
    render() {
        if (this.props.onLoad) {
            var instance: VistaDrag = this;
            this.props.onLoad(instance);
        }
        
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
                    <BackgroundImage
                        source={this.props.bgimage}
                    />
                    <SNestedScrollView
                        ref={(ref) => { this._scrollView = ref }}
                        style={{
                            //   backgroundColor:"#000"
                        }}
                        width={this.props.stateParent.widthContainer * this.state.scale}
                        height={this.props.stateParent.heightContainer * this.state.scale}
                        // backgroundImage={fondos[5]}
                        onLayout={(event) => {
                            this.onLayout(event)
                        }}>

                        <TouchableWithoutFeedback onPress={() => {

                        }}>
                            <DropFileView style={{
                                width: "100%",
                                height: "100%",
                                overflow: "hidden",
                                // backgroundColor: "#00000022",
                            }}
                                onPress={() => {
                                    Object.keys(this._fileDrag).map((keyRef) => {
                                        if (this._fileDrag[keyRef]) {
                                            this._fileDrag[keyRef].setSelect(false)

                                        }
                                    })

                                }}
                                onLayout={this.props.onLayout}
                                onUpload={(files, position) => {
                                    var allowUpload = true;
                                    if (this.props.state.fileReducer.routes.length > 0) {
                                        var key_file = this.props.state.fileReducer.routes[this.props.state.fileReducer.routes.length - 1].key
                                        var permisos = getPermisos(this.props, [key_file]);
                                        if (!permisos) {
                                            allowUpload = false;
                                        }
                                        if (!permisos[key_file]["subir"]) {
                                            allowUpload = false;
                                        }
                                    } else {
                                        if (this.props.state.fileReducer.activeRoot.key != "raiz") {
                                            allowUpload = false;
                                        }
                                    }
                                    if(!allowUpload){
                                        alert("No tiene permisos");
                                        return;
                                    }
                                    var pos = {
                                        x: (position.x / this.state.scale) - 55,
                                        y: (position.y / this.state.scale) - 55,
                                    }
                                    var arrPos = [];
                                    var curFile = getFilesInPath(this.props);
                                    for (let i = 0; i < files.files.length; i++) {
                                        var posicion = getPosicionDisponible({
                                            curFile, props: {
                                                ...this.props.stateParent,
                                                x: pos.x,
                                                y: pos.y
                                            }
                                        });
                                        arrPos.push({ ...posicion });
                                        posicion.x += 100;
                                        pos = posicion;
                                    }
                                    uploadHttp({
                                        props: {
                                            component: "file",
                                            type: "subir",
                                            estado: "cargando",
                                            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                            path: this.props.state.fileReducer.routes,
                                            positions: arrPos
                                        }, imput: files,
                                    }, (resp) => {

                                    })
                                }}>
                                {this.getFiles()}
                            </DropFileView>
                        </TouchableWithoutFeedback>

                    </SNestedScrollView>
                </View>
            </View >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ArchibosContainer);