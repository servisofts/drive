import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import BackPath from '../BackPath';
import NuevaCarpeta from '../NuevaCarpeta';
import RoutePath from '../RoutePath';
import SubirArchibo from '../SubirArchibo';
import ZoonFile from '../ZoonFile';

export default class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                width: "100%",
                height: 40,
            }}>
                <ScrollView style={{
                    width: "100%",
                    height: 40,
                }}
                    horizontal={true}
                    contentContainerStyle={{
                        height: 40,
                    }}>
                    <BackPath />
                    <RoutePath />
                    <SubirArchibo />
                    <NuevaCarpeta />
                    <ZoonFile/>

                </ScrollView>
            </View>
        );
    }
}
