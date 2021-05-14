import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as SFileImput from '../../../Component/SFileImput';
import { connect } from 'react-redux';
import Svg from '../../../Svg';

class ZoonFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={{
                margin: 4,
                width: 30,
                height: 35,
                // borderWidth: 1, 
                // borderRadius: 8,
                // backgroundColor:"#000",
                borderColor: "#ddd",
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {

            }}>
                <Svg resource={require('../../../img/zoon.svg')} style={{
                    width: "100%",
                    height: "100%",
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
export default connect(initStates)(ZoonFile);