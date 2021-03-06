import React, { Component } from 'react';
import { View, } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Params';
import { SButtom, SForm, SText, SView, } from '../../SComponent';
import Svg from '../../Svg';
import Server from './Server'
var _ref = {};
class LoginPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {};

  }
  onSubmit(_data) {
    var data;
    if (_data) data = _data;
    else data = this.formulario.onSubmit();
    var object = {
      component: "usuario",
      version: "2.0",
      type: "login",
      estado: "cargando",
      data: data,
    }
    this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
  }
  render() {
    if (this.props.state.usuarioReducer.estado == "error" && this.props.state.usuarioReducer.type == "login") {
      this.props.state.usuarioReducer.estado = "";
      if (this.formulario) {
        this.formulario.setError("password");
      }
    }
    if (this.props.state.usuarioReducer.usuarioLog) {
      this.props.navigation.replace("InicioPage");
      return <View />
    }

    return (
      <SView props={{
      }} style={{
        flex: 1,
        alignItems: "center",
      }}>
        <SView props={{
          col: "xs-6 md-4 lg-2",
          variant: "center"
        }} style={{
          marginTop: 16,
          marginBottom: 16,
        }}>
          <Svg name="logoBlanco"
            style={{
              width: "100%",
              height: "100%",
              fill: "#fff"
            }} />
        </SView>
        <Server />
        <SForm
          ref={(ref) => { this.formulario = ref }}
          props={{
            variant: "center",
            col: "xs-11 sm-9 md-8 lg-6 xl-4"
          }}
          submitProps={{
            label: "Login"
          }}
          inputProps={{
            customStyle: "primary",
          }}
          inputs={{
            usuario: { label: "Email", type: "email", isRequired: true },
            password: { label: "Password", type: "password", isRequired: true },
          }}
          hiddeSubmit
          onSubmit={(data) => this.onSubmit(data)}
        />
        <SView center col={"xs-10 md-6"} onPress={() => {
          this.props.navigation.navigate("RecuperarPassPage")
        }} >
          <SText>{"Olvido su contrase??a? Recuperar."}</SText>
        </SView>
        <SView props={{
          col: "xs-12",
          variant: "center",
          direction: "row",
        }} style={{
          marginTop: 16,

        }}>
          <SButtom
            style={{ margin: 6, }}
            props={{
              type: "outline",
            }} onPress={() => {
              this.props.navigation.navigate("UsuarioRegistroPageUpdate")
            }}>
            Registro
          </SButtom>
          <SButtom
            style={{ margin: 6, }}
            props={{
              type: "danger",

            }} onPress={() => {
              this.onSubmit();
            }}>
            Login
          </SButtom>


        </SView>
      </SView>

    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(LoginPage);