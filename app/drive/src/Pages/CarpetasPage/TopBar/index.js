import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import BackPath from './BackPath';
import NuevaCarpeta from './NuevaCarpeta';
import RoutePath from './RoutePath';
import SubirArchibo from './SubirArchibo';
import ZoonFile from './ZoonFile';
import ModoVista from './ModoVista';

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
                    {/* <RoutePath /> */}
                    <SubirArchibo />
                    <NuevaCarpeta />
                    <ModoVista {...this.props} vista={"lista"} />
                    <ModoVista {...this.props} vista={"drag"} />
                    <ZoonFile {...this.props} val={-0.1} />
                    <ZoonFile {...this.props} val={0.1} />

                </ScrollView>
            </View>
        );
    }
}
