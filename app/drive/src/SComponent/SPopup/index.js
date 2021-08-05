import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, ScrollView, ViewStyle } from 'react-native';
// import Svg from '../../Svg';
import { SScrollView } from '../../SComponent'
import { SView } from '../SView';
import SPopupComponent from './SPopupComponent';
import { PopupType, Types } from "./Types"
var INSTANCE = false;

type OpenType = {
    key: String,
    content: Component,
    style: ViewStyle,
    type: PopupType
}



export const SPopupOpen = ({ key, content, style, type }: OpenType) => {
    if (type) {
        if (!key) key = type;
        if (Types[type]) {
            var Elm = Types[type];
            var contenido = content;
            content = <Elm key={key} style={style} >{contenido}</Elm>;
        }
    }
    INSTANCE.open({ key, content, style });
}
export const SPopupClose = (key) => {
    INSTANCE.close(key);
}
export default class SPopup extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: {

            },
            style: {}
        };
        INSTANCE = this;
    }
    componentDidMount() {
        INSTANCE = this;
    }
    open({ key, content, style }) {
        // console.log(key);
        this.state.data[key] = content;
        if (style) {
            this.state.style[key] = style;
        } else {
            this.state.style[key] = {};
        }
        this.setState({ ...this.state });
    }
    close(key) {
        delete this.state.data[key];
        this.setState({ ...this.state });
    }

    getPopups() {
        return Object.keys(this.state.data).map((key) => {
            var obj = this.state.data[key];
            var style = this.state.style[key];
            return <SPopupComponent
                style={style}
                close={() => { this.close(key) }}
            >
                <TouchableWithoutFeedback>
                    {obj}
                </TouchableWithoutFeedback>
            </SPopupComponent>
        })
    }
    render() {
        INSTANCE = this;
        return (
            <>
                {this.getPopups()}
            </>
        );
    }
}
