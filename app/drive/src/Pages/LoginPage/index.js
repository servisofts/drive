import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import NaviDrawer from '../../Component/NaviDrawer';
import STextImput from '../../Component/STextImput';
import AppParams from '../../Params';
import Svg from '../../Svg';
var _ref = {};
class LoginPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.ImputUsuario = new STextImput({
      placeholder: "Usuario",
      autoCapitalize: "none",
      style: {
        width: "80%",
        padding: 8,
        height: 50,
        margin: 8,
        borderWidth: 2,
        borderColor: "#999",
        borderRadius: 8,
      }
    });
    this.ImputPassword = new STextImput({
      placeholder: "Password",
      secureTextEntry: true,
      style: {
        width: "80%",
        padding: 8,
        height: 50,
        margin: 8,
        borderWidth: 2,
        borderColor: "#999",
        borderRadius: 8,
      }
    });
  }
  componentDidMount() { // B

  }

  render() {

    if (this.props.state.usuarioReducer.estado == "error") {
      this.props.state.usuarioReducer.estado = "";
      this.ImputPassword.setError();
    }
    if (this.props.state.usuarioReducer.usuarioLog) {
      this.props.navigation.replace("CarpetasPage");
      return <View />
    }

    return (
      <>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            flex: 1,
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Svg name="logo"
              style={{
                width: (Dimensions.get("window").width + Dimensions.get("window").height) / 2 * 0.4,
                height: (Dimensions.get("window").width + Dimensions.get("window").height) / 2 * 0.4,
              }} />
          </View>

          <View style={{
            flex: 2,
            width: "100%",
            maxWidth: 600,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: "bold",
            }}>Identificarse</Text>
            {this.ImputUsuario.getComponent()}
            {this.ImputPassword.getComponent()}
          </View>
          <View style={{
            flex: 1,
            width: "100%",
            maxWidth: 600,
            justifyContent: 'center',
            flexDirection: "row",
          }}>
            {/* <TouchableOpacity style={{
              width: "40%",
              padding: 8,
              height: 50,
              margin: 8,
              borderWidth: 2,
              borderColor: "#999",
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
              onPress={() => {

              }}>
              <Text>Registrarse</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={{
              width: "40%",
              padding: 8,
              height: 50,
              margin: 8,
              borderWidth: 2,
              borderColor: "#999",
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }} onPress={() => {
              var isValid = true;

              if (this.ImputUsuario.verify() == false) isValid = false;
              if (this.ImputPassword.verify() == false) isValid = false;
              if (!isValid) {
                // alert("faltan datos")
              } else {
                var object = {
                  component: "usuario",
                  type: "login",
                  estado: "cargando",
                  data: {
                    usr: this.ImputUsuario.getValue(),
                    pass: this.ImputPassword.getValue(),
                  },
                }
                // alert(JSON.stringify(object));
                this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                // this.props.state.socketReducer.session["proyecto"].send(object, true);
              }
              this.setState({ ...this.state });
              return;
            }}>
              <Text>Iniciar session</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              width: "40%",
              padding: 8,
              height: 50,
              margin: 8,
              borderWidth: 2,
              borderColor: "#999",
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }} onPress={() => { this.props.navigation.navigate("UsuarioRegistroPage") }}>
              <Text>Registro</Text>
            </TouchableOpacity>

          </View>
        </View>
        <NaviDrawer />
      </>
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(LoginPage);