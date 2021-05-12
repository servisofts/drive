import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import NaviDrawer from '../../Component/NaviDrawer';
import NaviDrawerButtom from '../../Component/NaviDrawer/NaviDrawerButtom';
import * as SSNavigation from '../../SSNavigation'
import Svg from '../../Svg';


class InicioPage extends Component {
  static navigationOptions = {
    headerShown: true,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
    SSNavigation.setProps(props);

  }

  render() {
    return (<>
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
        // backgroundColor:"#000",
      }}>
        <View style={{
          width: "90%",
          margin: 16,
          height: 200,
          backgroundColor: "#fff"
        }}>

        </View>
        <Svg name="logo"
          style={{
            width: 200,
            height: 200,
          }} />


        <View style={{
          margin: 16,
          width: "90%",
          height: 200,
          backgroundColor: "#fff"
        }}>

        </View>
        {/* <Text>{JSON.stringify(this.props)}</Text> */}
        <NaviDrawerButtom open={() => {
          this.state.naviDrawer.open();
        }} />
      </View>
      <NaviDrawer ref={(ref) => {
        this.state.naviDrawer = ref;
      }} navigation={this.props.navigation} />
    </>
    );
  }
}
export default InicioPage;