import React, { Component, ViewStyle } from 'react';
import { View, Text } from 'react-native';
import { SButtom } from '../SButtom';
import { SInput, TypeInputProps } from '../SInput';
import { SView, SViewPropsType } from '../SView';
import { Col, TypeCol } from '../SView/cols';



interface InputsTp {
    [index: string]: TypeInputProps;
}
export type SFromProps = {
    style: ViewStyle,
    props: SViewPropsType,
    inputProps: TypeInputProps,
    inputs: InputsTp,
    onSubmit: Function,
    submitProps: {
        label: String,
    },
}
export default class SForm extends Component<SFromProps> {
    constructor(props) {
        super(props);
        this.state = {
        };
        this._ref = {};
    }
    setError(key) {
        if (this._ref[key]) {
            this._ref[key].setError(true);
        }
    }
    getButtom() {
        if (!this.props.onSubmit) return <View />
        var label = "REGISTRAR"
        if (this.props.submitProps) {
            if (this.props.submitProps.label) {
                label = this.props.submitProps.label;
            }
        }
        return <SButtom
            props={{
                type: "danger",
                col: "xs-12 md-6",
                variant:"confirm",
                // customStyle: "primary",
            }} onPress={() => {
                var data = {};
                var isValid = true;
                Object.keys(this._ref).map((key) => {
                    var input: SInput = this._ref[key];
                    if (!input.verify()) {
                        isValid = false;
                    }
                    data[key] = input.getValue();
                })
                if (isValid) {
                    this.props.onSubmit(data);
                }
            }}>
            {label}
        </SButtom>
    }
    getInputs() {
        if (!this.props.inputs) {
            return <View />
        }

        return Object.keys(this.props.inputs).map((key) => {
            var inputProps = this.props.inputs[key];
            return <SInput
                ref={(ref) => { this._ref[key] = ref }}
                placeholder={inputProps.label}
                props={{
                    ...this.props.inputProps,
                    ...inputProps
                }} />
        })
    }

    render() {
        return (
            <SView props={this.props.props}>
                {this.getInputs()}
                <SView style={{
                    height: 14,
                }}></SView>
                {this.getButtom()}
            </SView>
        );
    }
}
SForm.defaultProps = {
    props: {

    }
}