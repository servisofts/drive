import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import NaviDrawer from '../../Component/NaviDrawer';
import NaviDrawerButtom from '../../Component/NaviDrawer/NaviDrawerButtom';
import * as SSNavigation from '../../SSNavigation'
import ActionButtom from '../../Component/ActionButtom';
import AppParams from '../../Params';


class UsuarioPage extends Component {
  static navigationOptions = {
    title: "Lista de usuario.",
    headerShown: true,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
    SSNavigation.setProps(props);

  }

  render() {
    var data = this.props.state.usuarioReducer.data;
    if (!data) {
      if (this.props.state.usuarioReducer.estado == "cargando") {
        return <Text>Cargando</Text>
      }
      var object = {
        component: "usuario",
        type: "getAll",
        estado: "cargando",
        cabecera: "registro_administrador",
        data: ""
      }
      this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
      return <View />
    }

    const getLista = () => {
      return Object.keys(data).map((key) => {
        var obj = data[key];
        return <View style={{
          width: "90%",
          maxWidth: 500,
          height: 120,
          padding: 8,
          margin: 8,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: "#ddd",
        }}>
          <View style={{
            flex:3
          }}>
            <View style={{
              flexDirection: "row",
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: "bold"
              }}>{obj["Nombres"].dato + " " + obj["Apellidos"].dato}</Text>
            </View>
            <View style={{
              flexDirection: "row"
            }}>
              <Text style={{
                color: "#999"
              }}>Correo: </Text>
              <Text>{obj["Correo"].dato}</Text>
            </View>
            <View style={{
              flexDirection: "row"
            }}>
              <Text style={{
                color: "#999"
              }}>Telefono: </Text>
              <Text>{obj["Telefono"].dato}</Text>
            </View>
          </View>
          <View style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}>
            <ActionButtom label="Editar" style={{
              height: 30,
            }}
              onPress={() => {
                this.props.navigation.navigate("UsuarioRegistroPage", { key: key });
              }} />
            <ActionButtom label="Eliminar"
              style={{
                height: 30,
                backgroundColor: "#99000077"
              }}
              styleText={{
                color: "#fff"
              }}
              onPress={() => {
              
              }}
            />
          </View>
        </View>
      })
    }
    return (<>
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
        // backgroundColor:"#000",
      }}>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{
            alignItems: "center"
          }}
        >
          {getLista()}
        </ScrollView>

        <NaviDrawerButtom open={() => {
          this.state.naviDrawer.open();
        }} />
      </View>
      <NaviDrawer ref={(ref) => {
        this.state.naviDrawer = ref;
      }} navigation={this.props.navigation} />
    </>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(UsuarioPage);