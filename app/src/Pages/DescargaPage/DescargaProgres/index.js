import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ProgressCircle from '../../../Component/ProgressCircle';
import Svg from '../../../Svg';
import FilePreview from '../../CarpetasPage/FilePreview';

export default class DescargaProgres extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curPorcent: 0,
        };
    }
    animateTo(value, duration, extra) {
        this.setState({ curPorcent: value, extra: extra });
        this._progress.animateTo(value, duration);
    }
    getContenido() {
        if (this.state.curPorcent <= 0) {
            return (<TouchableOpacity style={{
                width: 300,
                height: 300,
                padding: 40,
                // backgroundColor: "#ffffff99",
                borderRadius: 200,
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {
                this.props.descargar();
            }}>
                <Svg resource={require("../../../img/download.svg")} style={{
                    width: "70%",
                    height: "70%",
                }} />
                <Text style={{ fontSize: 14, color: "#fff", textAlign: "center" }}>{"Click to start download!"} </Text>
            </TouchableOpacity>)
        } else {
            var porcent = (1 - this.state.curPorcent) * 100;
            const getDetail = (extra) => {
                if (!extra.received) {
                    return <View />
                }
                return <>
                    <Text style={{ fontSize: 18, color: "#fff" }}>{extra.velocity} </Text>
                    <Text style={{ fontSize: 18, color: "#fff" }}>{extra.received.val + " / " + this.state.extra.size.val} </Text>
                </>
            }
            return (<TouchableOpacity style={{
                width: 300,
                height: 300,
                padding: 40,
                // backgroundColor: "#ff6666",
                borderRadius: 200,
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {

            }}>
                <Text style={{ fontSize: 45, color: "#fff" }}>{porcent.toFixed(0) + "%"}</Text>
                {getDetail(this.state.extra)}
                <TouchableOpacity 
                onPress={()=>{
                    console.log(this.props.state.usuarioReducer.cancelarDescarga );
                }}
                style={{
                    position: 'absolute',
                    top: 10,
                    width: 35,
                    height: 35,
                    borderRadius: 100,
                    borderColor: "red",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{fontSize: 35  ,color:"red", fontWeight: 'bold',}}>
                        X
                    </Text>
                </TouchableOpacity>   
            </TouchableOpacity>)
        }
    }
    render() {
        return (
            <View style={{
                flex: 1,
                width: "100%",
                // backgroundColor:"#000",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ProgressCircle
                    initialColor={"#660000"}
                    finalColor={"#006600"}
                    porcentInicio={100}
                    strokeWidth={20}
                    width={320}
                    ref={(ref) => {
                        this._progress = ref;
                    }}
                    duration={10000}>
                    {this.getContenido()}
              
                </ProgressCircle>
            </View>
        );
    }
}
