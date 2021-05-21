import React, { Component } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import Carga from './Carga';
import Svg from '../../Svg';
import AppParams from '../../Params/index.json'

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
        backgroundColor:"#000"
      }}>

        <Animated.View
          style={[
            {
              // width: 300,
              width: "100%",
              // backgroundColor: "#ccc",
              alignItems: "center"
            },
            {
              transform: [
                {
                  scale: this.state.startValue,
                },
              ],
            },
          ]}
        >
          <Svg name="logoBlanco"
            style={{
              width: (Dimensions.get("window").width+Dimensions.get("window").height)/2 * 0.4,
              height:(Dimensions.get("window").width+Dimensions.get("window").height)/2 * 0.4,
            }} />
        </Animated.View>

        <Carga navigation={this.props.navigation} />

      </View>
    );
  }
}


export default CargaPage;