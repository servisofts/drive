import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../Params';
import FileDrag from './FileDrag';

class ArchibosContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getDetail() {
        return <View style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
            alignItems: "center"
        }}>
            <Text style={{ color: "#fff" }}> Archibos container </Text>
            <Text style={{ color: "#fff" }}> {JSON.stringify(this.state.dimensiones)}</Text>
        </View>
    }
    getFiles() {
        if (!this.state.dimensiones) {
            return <View />
        }
        var data = this.props.state.fileReducer.data;
        if (!data) {
            if (this.props.state.fileReducer.estado == "cargando") {
                return <View />
            }
            var object = {
                component: "file",
                type: "getAll",
                estado: "cargando",
            }
            // alert(JSON.stringify(object));
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        }
        var size = 120;
        var i = 0;
        var x = 10;
        var y = 10;
        var limit = 10;
        return Object.keys(data).map((key) => {
            var obj = data[key];
            if (i % limit == 0) {
                if(i!=0){
                    y += size
                }
                x = 10;
            } else {
                x += size;
            }
            i++;
            return (<FileDrag obj={obj} position={{
                x,
                y
            }} />)
        });
    }
    render() {
        return (
            <View style={{
                backgroundColor: "#300",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }} onLayout={(event) => {
                this.setState({
                    dimensiones: event.nativeEvent.layout
                })
            }}>
                {/* {this.getDetail()} */}
                {this.getFiles()}
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ArchibosContainer);