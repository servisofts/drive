import React, { Component } from 'react';
import { View, } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import AppParams from '../../Params';
import { SButtom, SForm, SPopupOpen, SText, SView, } from '../../SComponent';
import Svg from '../../Svg';
var _ref = {};
class LoginPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {};

  }
  render() {
    if (this.props.state.usuarioReducer.estado == "error" && this.props.state.usuarioReducer.type == "login") {
      this.props.state.usuarioReducer.estado = "";
      if (this.formulario) {
        this.formulario.setError("password");
        SPopupOpen({
          type: "Error", content: <SText props={{ type: "primary", variant: "h3" }} style={{
            textAlign: "center"
          }}>Error en los datos del usuario.</SText>
        })
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
        alignItems: "center"
      }}>
        <BackgroundImage />
        <SView props={{
          col: "xs-8 md-6 lg-4",
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
        <SForm
          ref={(ref) => { this.formulario = ref }}
          props={{
            variant: "center",
            col: "xs-11 sm-9 md-8 lg-6 xl-4"
          }}
          inputProps={{
            customStyle: "primary",
          }}
          inputs={{
            usuario: { label: "Correo", type: "email", isRequired: true },
            password: { label: "Contraseña", type: "password", isRequired: true },
          }}
          onSubmitName={"Login"}
          onSubmit={(data) => {
            var object = {
              component: "usuario",
              version: "2.0",
              type: "login",
              estado: "cargando",
              data: data,
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
          }}
        />
        <SView props={{
          col: "xs-12",
          variant: "center",
          direction: "row",
        }} style={{
          marginTop: 8,
        }}>
          <SButtom props={{
            type: "secondary"
          }} onPress={() => {

            this.props.navigation.navigate("UsuarioRegistroPage")
          }}>
            Registro
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