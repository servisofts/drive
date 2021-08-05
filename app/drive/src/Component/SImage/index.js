import React, { Component } from 'react';

const SImage = (props) => {
    return (
        <img src={!props.source.default ? props.source.uri : props.source.default} width="100%" height="100%" style={{ ...props.style }} draggable="false" />
    );
}
SImage.propTypes = {
    source: String
}
export default SImage;