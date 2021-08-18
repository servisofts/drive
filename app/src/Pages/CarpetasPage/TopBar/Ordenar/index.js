import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getPermisos } from '../../../../FileFunction';
import Svg from '../../../../Svg';

class Ordenar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (this.props.state.fileReducer.routes.length > 0) {
            var key_file = this.props.state.fileReducer.routes[this.props.state.fileReducer.routes.length - 1].key
            var permisos = getPermisos(this.props, [key_file]);
            if (!permisos) {
                return <View />
            }
            if (!permisos[key_file]["editar"]) {
                return <View />
            }
        } else {
            if (this.props.state.fileReducer.activeRoot.key != "raiz") {
                return <View />
            }
        }
        return (
            <TouchableOpacity style={{
                width: 43,
                height: 43,
                // borderWidth: 1, 
                // borderRadius: 8,
                // backgroundColor:"#000",
                borderColor: "#ddd",
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {
                if (this.props.ordenar) this.props.ordenar();
                // this.props.dispatch({
                //     component: "file",
                //     type: "reload",
                // })
                // this.props.navigation.navigate("DescargaPage")
            }}>

                <Svg name={"Ordenar"} style={{
                    width: 28,
                    height: 28,
                }} />

            </TouchableOpacity>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Ordenar);