import React, { Component } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import Carga from './Carga';
import Svg from '../../Svg';
import AppParams from '../../Params/index.json'
import BackgroundImage from '../../Component/BackgroundImage';
import LogoAnimado from '../../Component/LogoAnimado';

class CargaPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      startValue: new Animated.Value(1),
      endValue: 1.3,
    };
  }
  componentDidMount() { // B
    Animated.loop(
      Animated.spring(this.state.startValue, {
        toValue: this.state.endValue,
        friction: 1,
        useNativeDriver: true,
      }),
      { iterations: 1000 },
    ).start();
  }

  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BackgroundImage />
        <View
          style={{
            // width: 300,
            width: "100%",
            // backgroundColor: "#ccc",
            height: 200,
            alignItems: "center"
          }}
        >
          <LogoAnimado />
        </View>

        <Carga navigation={this.props.navigation} />

      </View >
    );
  }
}


export default CargaPage;