import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ActionButtom from '../../Component/ActionButtom';
import NaviDrawer from '../../Component/NaviDrawer';
import STextImput from '../../Component/STextImput';
import Svg from '../../Svg';
// import RolDeUsuario from './RolDeUsuario';
var _ref = {};
class UsuarioRegistroPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const key = navigation.getParam('key', false);
    return {
      headerShown: true,
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
        // defaultValue: this.data["Apellidos"].dato,
        // autoCapitalize: "none",
        style: styleImput
      }),
      Correo: new STextImput({
        placeholder: "Correo",
        // defaultValue: this.data["Correo"].dato,
        // autoCapitalize: "none",
        style: styleImput
      }),
      Telefono: new STextImput({
        placeholder: "Telefono",
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
      this.props.state.usuarioReducer.estado = "";
      alert("error");
    }
    if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "registro") {
      this.props.state.usuarioReducer.estado = "";
      this.props.navigation.goBack();
    }
    if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "editar") {
      this.props.state.usuarioReducer.estado = "";
      this.props.navigation.goBack();
    }
    return (
      <>
        <ScrollView contentContainerStyle={{
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
              <ActionButtom label={this.props.state.usuarioReducer.estado == "cargando" ? "cargando" : this.TextButom}
                onPress={() => {
                  if (this.props.state.usuarioReducer.estado == "cargando") {
                    return;
                  }
                  var isValid = true;
                  var objectResult = {};
                  Object.keys(this.imputs).map((key) => {
                    if (this.imputs[key].verify() == false) isValid = false;
                    objectResult[key] = this.imputs[key].getValue();
                  })
                  // if (isValid) {
                  //   var object = {};
                  //   if (!this.data.key) {
                  //     object = {
                  //       component: "permisoPage",
                  //       type: "registro",
                  //       estado: "cargando",
                  //       data: {
                  //         ...objectResult
                  //       },
                  //     }
                  //   } else {
                  //     object = {
                  //       component: "permisoPage",
                  //       type: "editar",
                  //       estado: "cargando",
                  //       data: {
                  //         ...this.data,
                  //         ...objectResult
                  //       }
                  //     }
                  //   }
                  //   this.props.state.socketReducer.session["proyecto"].send(object, true);
                  // }
                  this.setState({ ...this.state });
                  return;
                }}
              />
            </View>
          </View>
        </ScrollView>
        {/* <NaviDrawer /> */}
      </>
    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(UsuarioRegistroPage);