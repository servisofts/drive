import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as SFileImput from '../../../../Component/SFileImput';
import { connect } from 'react-redux';
import Svg from '../../../../Svg';

class SubirArchibo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={{
                margin: 4,
                width: 45,
                height: 35,
                // borderWidth: 1, 
                // borderRadius: 8,
                // backgroundColor:"#000",
                borderColor: "#ddd",
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {
                SFileImput.choseFile({
                    component: "file",
                    type: "subir",
                    estado: "cargando",
                    path: this.props.state.fileReducer.routes,
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    // key: this.data.key
                }, (resp) => {
                    // fetch(urlImage);
                    // var obj= JSON.parse(resp.data);
                    // this.props.dispatch(obj)
                });
            }}>
                <Svg resource={require('../../../../img/upload.svg')} style={{
                    width: 35,
                    height: 35,
                }} />
                {/* <Text style={{
                    fontSize:10,    
                    color: "#aaa",
                    fontWeight: "bold",
                    textAlign: "center"
                }}> Subir archibo </Text> */}
            </TouchableOpacity>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SubirArchibo);