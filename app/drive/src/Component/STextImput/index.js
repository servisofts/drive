import React, { Component } from 'react';
import { TextInput } from 'react-native';
import STheme from '../../STheme';
import CheckImput from './CheckImput';
import IntlPhoneInput from './NumberPhone/IntlPhoneInput';


class STextImput extends Component {
    propiedades;
    value;
    propsTemp = {};
    constructor(_props) {
        super(_props);
        this.state = {
        };
        this.propiedades = _props;
        this.propiedades.style = {
            width: "80%",
            padding: 8,
            height: 50,
            margin: 8,

            // borderBottomWidth: 1,
            // borderWidth: 1,
            // borderColor: STheme.color.secondary + "66",
            color: STheme.color.text,
            borderRadius: 8,
            backgroundColor: STheme.color.card,
            ...this.propiedades.style,
        }
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
        this.setState({ value: value });
        console.log("ASdasdasds")
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
        if (this.propiedades.isNull) {
            return true;
        }
        if (this.propiedades.type == "Check") {
            return true;
        }
        if (!this.value) {
            if (!this.propsTemp.style) {
                this.propsTemp.style = this.propiedades.style;
            }
            this.propiedades.style = {
                ...this.propiedades.style,
                borderColor: "#660000",
                borderWidth:1,
            }
            return false;
        }

        if (this.propiedades.type == "Email") {
            var aux = this.value.replace(/\s*$/, "");
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(aux) === false) {
                // if (!this.propsTemp.style) {
                //     this.propsTemp.style = this.propiedades.style;
                // }
                // this.propiedades.style = {
                //     ...this.propiedades.style,
                //     borderColor: "#BE223A"
                // }
                // return false
            }
        }
        if (this.propsTemp.style) {
            this.propiedades.style = { ...this.propsTemp.style };
            this.propsTemp.style = false;
        }
        return this.value;
    }
    focus() {
        this._ref.focus();
    }
    clear() {
        this._ref.clear();
        this.value = "";
        this.setState({ value: "" });
    }
    getComponent() {
        var INSTANCE = this;
        if (this.propiedades.type == "Check") {
            return <CheckImput {...this.propiedades} onChange={(val) => {
                INSTANCE.value = val;
            }} />
        }
        if (this.propiedades.type == "Phone") {
            return <IntlPhoneInput
                containerStyle={{
                    ...this.propiedades.style

                }}

                phoneInputStyle={{
                    flex: 1,
                    // width:"100%",
                    color: STheme.color.text,
                    height: "100%",
                    padding: 0,
                    outline: "none"
                }}
                inputProps={
                    { placeholderTextColor: STheme.color.text }
                }
                defaultCountry="BO"
                lang="en"
                placeholderTextColor={STheme.color.text}
                // onChangeText={onChangeText}
                onChangeText={(text) => {
                    INSTANCE.value = text.dialCode + " " + text.phoneNumber;
                }}
            />
        }
        var INSTANCE = this;
        return (<TextInput
            ref={(ref) => this._ref = ref}
            placeholderTextColor={'#666'}
            onChangeText={(text) => {
                this.setState({ value: text })
                this.value = text;
                this.value = this.value.trim();
                if (this.propiedades.type === "Monto") {
                    const clean = text.replace(/[^0-9]/g, '');
                    this.value = clean
                    // this.verify();
                    // return true;
                    // INSTANCE._ref.setNaviteProps({ test: clean })
                }
                if (this.propiedades.type == "Email") {
                    this.verify();
                }

            }}
            {...this.propiedades}

            style={{ ...this.propiedades.style, outline: "none" }}
        />)
    }
    render() {
        return this.getComponent();
    }
}
export default STextImput;