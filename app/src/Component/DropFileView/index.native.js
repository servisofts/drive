import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class DropFileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <TouchableOpacity activeOpacity={0} {...this.props}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}
