import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ActionButtom from '../../Component/ActionButtom';
import BarraSuperior from '../../Component/BarraSuperior';
import NaviDrawer from '../../Component/NaviDrawer';
import STextImput from '../../Component/STextImput';
import AppParams from '../../Params';
import Svg from '../../Svg';
// import RolDeUsuario from './RolDeUsuario';
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
      padding: 8,
      height: 50,
      margin: 8,
      color: "#fff",
      borderWidth: 2,
      borderColor: "#999",
      borderRadius: 8,
    }

    var key = this.props.navigation.getParam("key", false);
    this.TextButom = "CREAR";
    this.data = {};
    if (key) {
      this.TextButom = "EDITAR";
      this.data = this.props.state.usuarioReducer.data[key];
      this.data.key = key;
      if (!this.data) {
        alert("NO HAY DATA");
      }
    }

    this.imputs = {
      Nombres: new STextImput({
        placeholder: "Nombres",
        // defaultValue: this.data["Nombres"].dato,
        // autoCapitalize: "none",

        style: styleImput
      }),

      Apellidos: new STextImput({
        placeholder: "Apellidos",
        type: "correo",

        // defaultValue: this.data["Apellidos"].dato,
        // autoCapitalize: "none",
        style: styleImput
      }),
      Correo: new STextImput({
        placeholder: "Correo",
        // defaultValue: this.data["Correo"].dato,
        // autoCapitalize: "none",
        autoCapitalize: "none",
        autoCompleteType: "email",
        style: styleImput
      }),
      Telefono: new STextImput({
        placeholder: "Telefono",
        // defaultValue: this.data["Telefono"].dato,
        // autoCapitalize: "none",
        style: styleImput
      }),
      Password: new STextImput({
        placeholder: "Password",
        secureTextEntry: true,
        // defaultValue: this.data["Telefono"].dato,
        // autoCapitalize: "none",
        style: styleImput
      }),
    }
  }
  componentDidMount() { // B

  }

  render() {

    if (this.props.state.usuarioReducer.estado == "error") {
      console.log("Error " + this.props.state.usuarioReducer.error);
      this.props.state.usuarioReducer.estado = "";
    }
    if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "registro") {
      this.props.state.usuarioReducer.estado = "";
      this.props.navigation.goBack();
    }
    if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "editar") {
      this.props.state.usuarioReducer.estado = "";
      this.props.navigation.goBack();
    }

    if (!this.props.state.cabeceraDatoReducer.data["registro_administrador"]) {
      if (this.props.state.cabeceraDatoReducer.estado == "cargando") {
        return <View />
      }
      if (this.props.state.cabeceraDatoReducer.estado == "error") {
        return <View />
      }
      this.props.state.socketReducer.session[AppParams.socket.name].send({
        component: "cabeceraDato",
        type: "getDatoCabecera",
        estado: "cargando",
        cabecera: "registro_administrador"
      }, true);
      return <View />
    }
    return (
      <View style={{
        flex: 1,
        height: "100%",
      }}>
        <BarraSuperior duration={500} title={"Registrate"} goBack={() => {
          this.props.navigation.goBack();
        }} {...this.props} />
        <ScrollView style={{
          width: "100%",
          height: "100%"

        }} contentContainerStyle={{
          alignItems: "center",
          flex: 1,
          paddingTop: 100,
          backgroundColor: "#000"
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
              {Object.keys(this.imputs).map((key) => {
                return this.imputs[key].getComponent();
              })}
            </View>
            <View style={{
              flex: 1,
              width: "90%",
              maxWidth: 600,
              justifyContent: 'center',
              flexDirection: "row",
            }}>
              <ActionButtom label={this.props.state.usuarioReducer.estado == "cargando" ? "cargando" : this.TextButom}
                onPress={() => {
                  if (this.props.state.usuarioReducer.estado == "cargando") {
                    return;
                  }
                  var cabeceras = this.props.state.cabeceraDatoReducer.data["registro_administrador"];
                  var isValid = true;
                  var objectResult = {};
                  var arr = [];

                  Object.keys(this.imputs).map((key) => {
                    if (this.imputs[key].verify() == false) isValid = false;
                    objectResult[key] = this.imputs[key].getValue();
                    var dato = false;
                    cabeceras.map((cabe) => {
                      if (cabe.dato.descripcion == key) {
                        dato = cabe;
                      }
                    })

                    arr.push({
                      dato: dato,
                      data: this.imputs[key].getValue()
                    })
                  })
                  if (!isValid) {
                    this.setState({ ...this.state });
                    return;
                  }
                  var object = {
                    component: "usuario",
                    type: "registro",
                    version: "2.0",
                    estado: "cargando",

                    cabecera: "registro_administrador",
                    data: arr,
                  }
                  // alert(JSON.stringify(object));
                  this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(UsuarioRegistroPage);