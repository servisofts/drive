import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BarraSuperior from '../../Component/BarraSuperior';
import SubirArchibo from './SubirArchibo';
import NuevaCarpeta from './NuevaCarpeta';
import ArchibosContainer from './ArchibosContainer';

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
                <BarraSuperior title={"Drive."} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{
                    width: "100%",
                    height: 40,
                    flexDirection: "row"
                }}>
                    <SubirArchibo />
                    <NuevaCarpeta />
                </View>
                <ArchibosContainer>

                </ArchibosContainer>

            </View>
        );
    }
}
