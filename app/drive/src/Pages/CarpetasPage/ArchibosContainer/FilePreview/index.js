import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SImage from '../../../../Component/SImage';

export default class FilePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    getMimeType() {
        var arrs = this.props.src.split(".");
        var type = arrs[arrs.length - 1]
        var Item = false;
        if (type == "png"
            || type == "jpg"
            || type == "jpeg"
            || type == "svg"
        ) {
            return <SImage source={this.props.src}/>;
        }

        return <Text style={{
            color: "#fff"
        }}> {type}</Text>;
    }
    render() {
        return (
            <View style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {this.getMimeType()}
            </View>
        );
    }
}
