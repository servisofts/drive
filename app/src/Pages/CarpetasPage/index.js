import React, { Component } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import BarraSuperior from '../../Component/BarraSuperior';
import ArchibosContainer from './VistaDrag';
import TopBar from './TopBar';
import VistaLista from './VistaLista';
import { connect } from 'react-redux';
import AppParams from '../../Params/index';

class CarpetasPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        var width = Dimensions.get("window").width;
        var height = Dimensions.get("window").height;

        var widthContainer = 830;
        var scale = (width / widthContainer);
        if (width <= widthContainer) {
            scale = scale * 1.5
        }

        this.state = {
            widthContainer: widthContainer,
            heightContainer: 2000,
            scaleGlobal: scale,
            vista: "lista",
            reload: false,
            title: "/",
        };
    }
    actualizarPosicion = (props) => {
        var object = {
            component: "file",
            type: "editar",
            estado: "cargando",
            tipo_seguimiento: "cambiar_posicion",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            data: props,
            path: this.props.state.fileReducer.routes
        }
        // alert(JSON.stringify(object));
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    }
    setTitle = (text) => {

    }
    getVista() {
        if (this.state.reload) {
            this.setState({ reload: false });
            return <View />
        }
        var bgimage = require("../../img/fondos/color/1.jpg");
        if (this.state.vista == "lista") {
            return <VistaLista {...this.props} setTitle={this.setTitle} scaleGlobal={this.state.scaleGlobal} bgimage={bgimage} />
        }
        return <ArchibosContainer {...this.props} onLoad={(ref) => { this.vistaDrag = ref }} stateParent={this.state} scaleGlobal={this.state.scaleGlobal} bgimage={bgimage} />
    }
    render() {

        var Barra = <BarraSuperior goBack={() => { this.props.navigation.goBack() }} navigation={this.props.navigation} />
        if (this.props.state.fileReducer.routes.length > 0) {
            this.props.state.fileReducer.routesImagen=this.props.state.fileReducer.routes
            Barra = <BarraSuperior navigation={this.props.navigation} goBack={() => {
                this.props.dispatch({
                    component: "file",
                    type: "backFolder",
                    estado: "cargando",
                })
            }} />
        }

        return (
            <View style={{
                flex: 1,
                height: "100%",
            }}>
                {Barra}
                <TopBar  {...this.props} stateParent={this.state} changeVista={(vista) => {
                    this.setState({ vista: vista });
                }} zoom={(val) => {
                    this.setState({ scaleGlobal: this.state.scaleGlobal + val, reload: true });
                }} ordenar={() => {
                    if (this.vistaDrag) {
                        if (this.vistaDrag.ordenar) {
                            this.vistaDrag.ordenar();
                        }
                    }
                }} />
                {this.getVista()}
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CarpetasPage);