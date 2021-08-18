import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getFilesInPath, getPermisos, getPosicionDisponible } from '../../../../FileFunction';
import AppParams from '../../../../Params';
import Svg from '../../../../Svg';

class ShowMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        if (this.props.state.fileReducer.routes.length <= 0) {
            return <View />
        }
     
        return (
            <>
                <TouchableOpacity style={{
                    width: 42,
                    height: 42,
                    // borderWidth: 1,
                    borderRadius: 8,
                    borderColor: "#ddd",
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={() => {
                    var files = this.props.state.fileReducer.routes[this.props.state.fileReducer.routes.length - 1];
                    // alert(JSON.stringify(files,"\s","\t"));
                    this.props.navigation.navigate("FilePerfil", files);
                }}>
                    <Svg name={"ShowMore"} style={{
                        width: 32,
                        height: 30,
                    }} />
                    {/* <Text style={{
                        fontSize: 10,
                        color: "#aaa",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}> Nueva carpeta </Text> */}
                </TouchableOpacity>
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ShowMore);