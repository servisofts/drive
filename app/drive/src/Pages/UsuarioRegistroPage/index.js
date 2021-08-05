import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import AppParams from '../../Params';
import { SForm, SPopupOpen, SScrollView2, SText, SView } from '../../SComponent';
class UsuarioRegistroPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { // B

  }

  render() {
    if (this.props.state.usuarioReducer.estado == "error" && this.props.state.usuarioReducer.type == "registro") {
      this.props.state.usuarioReducer.estado = "";
      SPopupOpen({
        type: "Error", content: <SText props={{ type: "primary", variant: "h3" }} style={{
          textAlign: "center"
        }}>El usuario ya existe.</SText>
      })
    }
    if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "registro") {
      this.props.state.usuarioReducer.estado = "";
      // this.data = this.props.state.usuarioReducer.lastRegister;
      this.props.navigation.goBack();
    }
    if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "editar") {
      this.props.state.usuarioReducer.estado = "";
      this.props.navigation.goBack();
    }
    return (
      <View style={{
        width: "100%",
        flex: 1,
      }}>
        <BackgroundImage />

        <BarraSuperior title={(!this.data ? "Registro  de" : "Editar") + " usuario"} navigation={this.props.navigation}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <SView style={{
          flex: 1,
          width: "100%",
        }} props={{
          variant: "center"
        }}>
          <SScrollView2 disableHorizontal>
            <SView style={{
              flex: 1,
              width: "100%",
            }} props={{
              variant: "center"
            }}>
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
                  Nombres: { label: "Nombres", type: "default", isRequired: true },
                  Apellidos: { label: "Apellidos", type: "default", isRequired: true },
                  Correo: { label: "Correo", type: "email", isRequired: true },
                  Telefono: { label: "Telefono", type: "phone", isRequired: true },
                  Password: { label: "Contraseña", type: "password", isRequired: true },
                  Password2: { label: "Repetir contraseña", type: "password", isRequired: true },
                }}
                onSubmitName={"Login"}
                onSubmit={(data) => {

           
                {Object.keys(this.imputs).map((key) => {
                  return this.imputs[key].getComponent();
                })}
              </View>
              <View style={{
                flex: 1,
                width: "100%",
                maxWidth: 600,
                justifyContent: 'center',
                flexDirection: "row",
              }}>
                <ActionButtom label={(!this.data ? "REGISTRAR" : "EDITAR")} label={this.props.state.usuarioReducer.estado == "cargando" ? "cargando" : this.TextButom}
                  onPress={() => {
                    // if (this.props.state.usuarioReducer.estado == "cargando") {
                    //   return;
                    // }
                    var isValid = true;
                    var objectResult = {};
                    var arr = [];
                    Object.keys(this.imputs).map((key) => {
                      if (this.imputs[key].verify() == false) isValid = false;
                      objectResult[key] = this.imputs[key].getValue();
                      var dato = false;
                    })
                    if (!isValid) {
                      this.setState({ ...this.state });
                      return;
                    }
                    var object = {
                      component: "usuario",
                      type: this.data ? "registro" : "editar",
                      version: "2.0",
                      // key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                      estado: "cargando",
                      cabecera: "registro_administrador",
                      data: {
                        ...this.data,
                        ...objectResult
                      },
                    }
                    // alert(JSON.stringify(object));
                    this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                    return;
                  }}
                />
              </View>
            </View>
            {/* <RolDeUsuario data={this.data} /> */}
          </SSCrollView>
        </View>
      </View>
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(UsuarioRegistroPage);