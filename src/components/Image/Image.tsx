import React, { useEffect, useState } from "react";

const Image = (props: {src: string}) => {
    const [imagePath, setImagePath] = useState('');

    useEffect(() => {
        (async () => {
            const path = await import(`../../assets/img/${props.src}.jpg`);
            setImagePath(path.default);
        })();
    }, [props.src])

    return <img src= { imagePath } />
}

export default Image;