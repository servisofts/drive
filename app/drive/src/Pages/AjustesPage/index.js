import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import DeleteBtn from '../../Component/DeleteBtn';
import NaviDrawer from '../../Component/NaviDrawer';
import NaviDrawerButtom from '../../Component/NaviDrawer/NaviDrawerButtom';
import SSCrollView from '../../Component/SScrollView';
import * as SSNavigation from '../../SSNavigation'
import Svg from '../../Svg';


class AjustesPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
    SSNavigation.setProps(props);

  }

  getBtn({ title, icon }) {
    return <View style={{
      width: "100%",
      height: 50,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <View>
        <Text>{title}</Text>
      </View>
      <View>

      </View>
    </View>
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
        <BarraSuperior title={"Ajustes"} goBack={() => {
          this.props.navigation.goBack();
        }} navigation={this.props.navigation} />

        <View style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <SSCrollView>
            {/* <Accesos navigation={this.props.navigation} /> */}
            {this.getBtn({
              title: "Sobre nosotros.",
              icon: ""
            })}
          </SSCrollView>
        </View>

      </View>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(AjustesPage);