import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import SSCrollView from '../../Component/SScrollView';
import * as SSNavigation from '../../SSNavigation'
import Svg from '../../Svg';
import ListaObservadores from './ListaObservadores';

class CompartidosPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
    SSNavigation.setProps(props);

  }

  render() {

    if (!this.props.state.usuarioReducer.usuarioLog) {
      this.props.navigation.replace("LoginPage");
      return <View />
    }
    return (
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        // backgroundColor: "#222",
      }}>
        <BackgroundImage source={(require("../../img/fondos/background.png"))} />
        <BarraSuperior title={"Compartidos"} navigation={this.props.navigation} goBack={() => {
          this.props.navigation.goBack();
        }} />

        <View style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <SSCrollView>
            <View style={{
              width: "100%",
              flexDirection: "row",
              flexWrap: "wrap"
            }}>
              <ListaObservadores navigation={this.props.navigation} />
            </View>
          </SSCrollView>
        </View>

      </View>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(CompartidosPage);