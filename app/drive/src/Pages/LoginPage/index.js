import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
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
    var style = {
      width: "80%",
      padding: 8,
      height: 50,
      color: "#fff",
      margin: 8,
      borderWidth: 1,
      backgroundColor: "#ffffff22",
      borderColor: "#444",
      borderRadius: 8,
    }
    this.ImputUsuario = new STextImput({
      placeholder: "Usuario",
      autoCapitalize: "none",
      style: style
    });
    this.ImputPassword = new STextImput({
      placeholder: "Password",
      secureTextEntry: true,
      style: style
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
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={{
          flex: 1,
          width: "100%",
          backgroundColor: "#000",
          // justifyContent: "center",
          alignItems: "center"
        }}
        >
          <View style={{
            width: "100%",
            alignItems: 'center',
            transform: [
              { rotateX: "8deg" }
            ]
            // backgroundColor:"#000"
          }}>
            <Svg name="logoBlanco"
              style={{
                width: "70%",
                maxWidth: 500,
                height: 300,
                fill: "#fff"
              }} />
          </View>

          <View style={{
            // backgroundColor:"#000"
            width: "100%",
            maxWidth: 600,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontSize: 16,
              // fontWeight: "bold",
              color: "#999"
            }}>Iniciar session</Text>
            {this.ImputUsuario.getComponent()}
            {this.ImputPassword.getComponent()}
          </View>
          <View style={{
            width: "100%",
            maxWidth: 600,
            // backgroundColor:"#000",
            justifyContent: 'center',
            flexDirection: "row",
          }}>
            <TouchableOpacity style={styles.BTN} onPress={() => {
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
              <Text style={{
                color: "#999"
              }}>Iniciar session</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BTN} onPress={(evt) => {
              this.props.navigation.navigate("UsuarioRegistroPage")
            }}>
              <Text style={{
                color: "#999"
              }}>Registro</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BTN: {
    width: "35%",
    height: 40,
    margin: 8,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(LoginPage);