import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Usuarios from './Usuarios';
import BarraSuperior from '../../Component/BarraSuperior/index';
import BackgroundImage from '../../Component/BackgroundImage/index';

export default class FileUsuariosPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
        this.data = props.navigation.state.params;
    }

    render() {
        return (
            <View style={{
                flex: 1,
                width: '100%',
            }}>
                <BarraSuperior duration={500} title={"Detalle"} navigation={this.props.navigation} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{
                    width: "100%",
                    flex: 1,
                    alignItems: "center",
                }}>
                    <BackgroundImage/>
                    <Usuarios file={this.data} />

                </View>
            </View>
        );
    }
}
