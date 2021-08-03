import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Svg from '../../../../Svg';
import { STheme } from '../../../STheme';
import { SView } from '../../../SView';

export default class PopupError extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SView style={{
        maxWidth: "90%",
        maxHeight: "90%",
        width: 350,
        height: 240,
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden"
      }}>
        <SView props={{
          col: "xs-12",
          variant: "center"
        }} style={{
          height: 100,
        }}>
          <Svg name={"Error"} style={{
            width: 90,
            height: 90
          }} />
        </SView>
        <SView props={{
          col: "xs-12",
          variant: "center"
        }} style={{
          height: 120,
        }}>
          {this.props.children}
        </SView>
      </SView>
    );
  }
}
