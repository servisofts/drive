import React, { useEffect, useState } from 'react';

const SvgInline = props => {
    const [svg, setSvg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isErrored, setIsErrored] = useState(false);

    useEffect(() => {
        fetch(props.url)
            .then(res => res.text())
            .then(setSvg)
            .catch(setIsErrored)
            .then(() => setIsLoaded(true))
    }, [props.url]);
    if (!svg) {
        return <div/>;
    }
    var str = svg.replace(/width..*?\"/g, "");
    str = str.replace(/height..*?\"/g, "");
    return (
        <svg
            // style={{ width: "100%", height: "100%", }}
            dangerouslySetInnerHTML={{ __html: str }}
        />
    );
}
export default SvgInline;