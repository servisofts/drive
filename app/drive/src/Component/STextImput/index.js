import React, { Component } from 'react';
import { TextInput } from 'react-native';


class STextImput {
    propiedades;
    value;
    propsTemp = {};
    constructor(_props) {
        this.propiedades = _props;
        this.value = "";
        if (_props.defaultValue) {
            this.value = _props.defaultValue;
        }
        if (_props.value) {
            this.value = _props.value;
        }



    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    setError() {
        if (!this.propsTemp.style) {
            this.propsTemp.style = this.propiedades.style;
        }
        this.propiedades.style = {
            ...this.propiedades.style,
            borderColor: "#ff0000"
        }
        return false;
    }
    verify() {
        if (!this.value) {
            if (!this.propsTemp.style) {
                this.propsTemp.style = this.propiedades.style;
            }
            this.propiedades.style = {
                ...this.propiedades.style,
                borderColor: "#ff0000"
            }
            return false;
        }
        if (this.propsTemp.style) {
            this.propiedades.style = { ...this.propsTemp.style };
            this.propsTemp.style = false;
        }
        return this.value;
    }
    getComponent() {
        return (<TextInput
            placeholderTextColor={'#666'}
            onChangeText={(text) => {
                this.value = text;
                this.value= this.value.trim();
            }}
            {...this.propiedades}
        />)
    }
}
export default STextImput;