import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { SPopupOpen } from '../../SPopup';
import { SButtom, SForm, SPopup, SScrollView2, SView, } from '../../SComponent';
import Svg from '../../Svg';
import AppParams from '../../Params';
import BarraSuperior from '../../Component/BarraSuperior';

var _ref = {};
class UsuarioRegistroPageUpdate extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      error: []
    };
  }
  componentDidMount() { // B

  }

  render() {
    if (this.props.state.usuarioReducer.estado == "error" && this.props.state.usuarioReducer.type == "registro") {
      this.props.state.usuarioReducer.estado = "";
      SPopup.alert("Usuario ya existe")
      // alert()
      // var close = SPopupOpen(<View key={"errorUsuario"} style={{
      //   width: "100%",
      //   height: 200,
      //   backgroundColor: "#fff",
      //   borderRadius: 8,
      // }}>
      //   <Text>Usted es este usuario?</Text>
      //   <Text>{JSON.stringify(this.props.state.usuarioReducer.error)}</Text>
      //   <TouchableOpacity onPress={() => {
      //     close()
      //   }} style={{
      //     width: 100,
      //     height: 50,
      //     backgroundColor: "#660000"
      //   }}>
      //   </TouchableOpacity>
      // </View>);
      // if (this.props.state.usuarioReducer.error) {
      //   Object.keys(this.props.state.usuarioReducer.error).map((key) => {
      //     var data = this.props.state.usuarioReducer.error[key]
      //     console.log(data);
      //   })
      // }

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
      <SView props={{
      }} style={{
        flex: 1,
        alignItems: "center"
      }}>

        <BarraSuperior title={"Registro de usuario"} navigation={this.props.navigation}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <SView props={{ col: "xs-12", variant: "center" }} style={{
          flex: 1,
        }}>
          <SScrollView2 disableHorizontal>
            <SView props={{ col: "xs-12", variant: "center" }}>
              <SView props={{
                col: "xs-8 md-6 xl-3",
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
                submitProps={{
                  label: "Registrar"
                }}
                inputProps={{
                  customStyle: "primary",
                }}
                onErrorForm={this.state.error}
                inputs={{
                  Nombres: { label: "Nombres", type: "default", isRequired: true },
                  Apellidos: { label: "Apellidos", type: "default", isRequired: true },
                  Correo: { label: "Correo", type: "email", isRequired: true },
                  Telefono: { label: "Telefono", type: "phone", isRequired: true },
                  Password: { label: "Password", type: "password", isRequired: true },
                }}


                onSubmit={(data) => {
                  var object = {
                    component: "usuario",
                    version: "2.0",
                    cabecera: "registro_administrador",
                    type: "registro",
                    estado: "cargando",
                    data: data,
                  }
                  this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                  this.setState({ ...this.state })
                }}
              />
            </SView>
            <SView style={{
              height: 50,
              width: "100%",
            }}>

            </SView>
          </SScrollView2>
        </SView>
      </SView>


    );
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(UsuarioRegistroPageUpdate);