import React, { Component } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import BarraSuperior from '../../Component/BarraSuperior';
import ArchibosContainer from './VistaDrag';
import TopBar from './TopBar';
import VistaLista from './VistaLista';

export default class CarpetasPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        var width = Dimensions.get("window").width;
        var height = Dimensions.get("window").height;

        var widthContainer = 800;
        var scale = (width / widthContainer);
        if (width <= 800) {
            scale = scale * 1.5
        }

        this.state = {
            widthContainer: widthContainer,
            scaleGlobal: scale,
            vista: "drag",
            reload: false,
        };
    }

    getVista() {
        if (this.state.reload) {
            this.setState({ reload: false });
            return <View />
        }
        var bgimage = require("../../img/fondos/color/1.jpg");
        if (this.state.vista == "lista") {
            return <VistaLista {...this.props} scaleGlobal={this.state.scaleGlobal} bgimage={bgimage} />
        }
        return <ArchibosContainer {...this.props} stateParent={this.state} scaleGlobal={this.state.scaleGlobal} bgimage={bgimage} />
    }
    render() {


        return (
            <View style={{
                flex: 1,
                height: "100%",
            }}>
                <BarraSuperior title={"Drive."} />
                <TopBar  {...this.props} changeVista={(vista) => {
                    this.setState({ vista: vista });
                }} zoom={(val) => {
                    this.setState({ scaleGlobal: this.state.scaleGlobal + val, reload: true });
                }} />
                {this.getVista()}
            </View>
        );
    }
}
