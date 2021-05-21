import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { openDropDown } from '../../../../Component/DropDown';
import Svg from '../../../../Svg';
import ModoVista from '../ModoVista';

export default class Vistas extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (<TouchableOpacity style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "#ffffff44"
        }} onPress={(evt) => {
            openDropDown({
                top: 85,
                left: 100,
                width: 150,
                height: 45,
                childrens: (
                    <View style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#00000099",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                    }}>
                        <ModoVista {...this.props} vista={"lista"} />
                        <ModoVista {...this.props} vista={"drag"} />
                    </View>
                )
            })
        }}>
            <Svg resource={require('../../../../img/list.svg')} style={{
                width: 30,
                height: 30,
                // fill:"#fff"
            }} />
        </TouchableOpacity>
        );
    }
}
