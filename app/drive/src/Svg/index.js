import React from 'react';
import { Platform, Text } from 'react-native';
import Logo from '../img/logo.svg';
import See from '../img/see.svg';

const Svg = (props) => {

    switch (props.name) {
        case "logo":
            return (Platform.OS=="web"?<img style={props.style} src={Logo} />:<Logo style={props.style} />);
        case "see":
            return (Platform.OS=="web"?<img style={props.style} src={See} />:<See style={props.style} />);
        default: return <Text>Not Found</Text>
    }
}



export default Svg;