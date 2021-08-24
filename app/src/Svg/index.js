import React from 'react';
import { Platform, Text } from 'react-native';
import Logo from '../img/logo.svg';
import LogoB from '../img/logoblanco.svg';
import See from '../img/see.svg';
import Folder from '../img/ssfolder.svg';
import EPUndefined from '../img/extensionPack/undefined.svg';
import ShowMore from '../img/showmore.svg';
import Ordenar from '../img/ordenar.svg';
import IcysMedical from '../img/IcysMedical.svg'
const Svg = (props) => {

    if (props.resource) {
        return (Platform.OS == "web" ? <img style={props.style} src={props.resource.default} /> : <props.resource.default style={props.style} />);
    }
    switch (props.name) {
        case "logo":
            return (Platform.OS == "web" ? <img style={props.style} src={Logo} /> : <Logo style={props.style} />);
        case "IcysMedical":
            return (Platform.OS == "web" ? <img style={props.style} src={IcysMedical} /> : <IcysMedical style={props.style} />);
        case "logoBlanco":
            return (Platform.OS == "web" ? <img style={props.style} src={LogoB} /> : <LogoB style={props.style} />);
        case "see":
            return (Platform.OS == "web" ? <img style={props.style} src={See} /> : <See style={props.style} />);
        case "folder":
            return (Platform.OS == "web" ? <img style={props.style} src={Folder} /> : <Folder style={props.style} />);
        case "EPUndefined":
            return (Platform.OS == "web" ? <img style={props.style} src={EPUndefined} /> : <EPUndefined style={props.style} />);
        case "ShowMore":
            return (Platform.OS == "web" ? <img style={props.style} src={ShowMore} /> : <ShowMore style={props.style} />);
        case "Ordenar":
            return (Platform.OS == "web" ? <img style={props.style} src={Ordenar} /> : <Ordenar style={props.style} />);
        default: return <Text>Not Found</Text>
    }
}

Svg.propsType = {
    name: String,
    resource: Object,
}

export default Svg;