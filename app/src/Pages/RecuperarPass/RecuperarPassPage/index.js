import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native';
import RecuperarPass from './RecuperarPass';
import BarraSuperior from '../../../Component/BarraSuperior';
import { SPopup } from '../../../SComponent';

class RecuperarPassPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.state.usuarioReducer.estadoEmail == "exito" && this.props.state.usuarioReducer.type == "recuperarPass") {
            SPopup.alert("Le hemos enviado un código a su correo electrónico")
            this.props.state.usuarioReducer.estadoEmail = false
            this.props.navigation.navigate("CodigoRecibidoPage")
            // this.state..value = ""
            // this.setState({ ...this.state })
        }

        return (
            <View style={{
                flex: 1,
                width: "100%",
            }}>
                <BarraSuperior goBack={() => { this.props.navigation.goBack() }} title={"Recuperar password"} />
                <RecuperarPass navigation={this.props.navigation} />
            </View>
        )
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(RecuperarPassPage);
