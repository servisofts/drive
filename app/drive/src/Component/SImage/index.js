import React, { Component } from 'react';

const SImage = (props) => {
    return (
        <img src={!props.source.default?props.source:props.source.default} width="100%" height="100%" style={{ ...props.style }} draggable="false" />
    );
}
export default SImage;