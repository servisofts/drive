import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BarraSuperior from '../../Component/BarraSuperior';
import SubirArchibo from './SubirArchibo';
import NuevaCarpeta from './NuevaCarpeta';
import ArchibosContainer from './ArchibosContainer';
import RoutePath from './RoutePath';
import BackPath from './BackPath';
import TopBar from './TopBar';

export default class CarpetasPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
            }}>
                <BarraSuperior title={"Drive."} />
                <TopBar />
                <ArchibosContainer {...this.props} />
            </View>
        );
    }
}
