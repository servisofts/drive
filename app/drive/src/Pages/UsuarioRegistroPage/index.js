import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ActionButtom from '../../Component/ActionButtom';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import NaviDrawer from '../../Component/NaviDrawer';
// import SFotoPicker from '../../Component/SFotoPicker';
import { choseFile } from '../../Component/SImageImput';
import SSCrollView from '../../Component/SScrollView';
import STextImput from '../../Component/STextImput';
import AppParams from '../../Params';
import { SPopupOpen } from '../../SPopup';
import STheme from '../../STheme';
import Svg from '../../Svg';
import RolDeUsuario from './RolDeUsuario';
var _ref = {};
class UsuarioRegistroPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const key = navigation.getParam('key', false);
    return {
      headerShown: false,
      title: (!key ? "Crear usuario" : "Editar usuario")
    }
  }
  constructor(props) {
    super(props);
    this.state = {};
    var styleImput = {
      width: "80%",
      height: 50,
      borderWidth: 1,
      borderColor: "#999",
      margin: 8,
      borderRadius: 4,
      padding: 8,
      color:"#fff",
    }
    this.cabecera = "registro_administrador"
    var key = this.props.navigation.getParam("key", false);
    this.TextButom = "CREAR";
    this.data = {};
    if (key) {
      this.TextButom = "EDITAR";
      this.data = this.props.state.usuarioReducer.data[this.cabecera][key];
      // this.data.key = key;
      if (!this.data) {
        alert("NO HAY DATA");
      }
    }

    this.imputs = {
      Nombres: new STextImput({
        placeholder: "Nombres",
        defaultValue: this.data["Nombres"],
        // autoCapitalize: "none",
        style: styleImput
      }),

      Apellidos: new STextImput({
        placeholder: "Apellidos",
        defaultValue: this.data["Apellidos"],
        // autoCapitalize: "none",
        style: styleImput
      }),
      Correo: new STextImput({
        placeholder: "Correo",
        defaultValue: this.data["Correo"],
        // autoCapitalize: "none",
        style: styleImput
      }),
      Telefono: new STextImput({
        placeholder: "Telefono",
        type: "Phone",
        defaultValue: this.data["Telefono"],
        // autoCapitalize: "none",
        style: styleImput
      }),
      Password: new STextImput({
        placeholder: "Password",
        defaultValue: this.data["Password"],
        // autoCapitalize: "none",
        style: styleImput
      }),
    }
  }
  componentDidMount() { // B

  }

  render() {
    if (this.props.state.usuarioReducer.estado == "error" && this.props.state.usuarioReducer.type == "registro") {
      this.props.state.usuarioReducer.estado = "";
      // alert()
      var close = SPopupOpen(<View key={"errorUsuario"} style={{
        width: "100%",
        height: 200,
        backgroundColor: "#fff",
        borderRadius: 8,
      }}>
        <Text>Usted es este usuario?</Text>
        <Text>{JSON.stringify(this.props.state.usuarioReducer.error)}</Text>
        <TouchableOpacity onPress={() => {
          close()
        }} style={{
          width: 100,
          height: 50,
          backgroundColor: "#660000"
        }}>
        </TouchableOpacity>
      </View>);
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

        <BarraSuperior title={(this.data ? "Registro" : "Editar") + " de usuario"} navigation={this.props.navigation}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <SSCrollView contentContainerStyle={{
            alignItems: "center"
          }}>
            <View style={{
              width: "90%",
              maxWidth: 600,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <View style={{
                width: "100%",
                maxWidth: 600,
                alignItems: 'center',
                // justifyContent: 'center',
              }}>
                {/* <SFotoPicker style={{
                  width: 180,
                  height: 180
                }}
                  data={{
                    component: "proyecto",
                    key: (!this.data ? "" : this.data.key),
                    url: AppParams.servicios["proyecto"] + "usuario_",
                  }} /> */}

           
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