import React, { Suspense, useEffect, useState } from "react";

const Image = (props: any) => {
    const {src, name} = props
    const [imagePath, setImagePath] = useState(src);

    useEffect(() => {
        (async () => {
            let path: any = null
            if (name) {
                path = await import(`../../assets/img/${name}/${src}.jpg`);
            } else {
                path = await import(`../../assets/img/${src}.png`);
            }
            setImagePath(path.default);
        })();
    }, [src])

    return (
        <Suspense fallback='Loading..'>
            <img src={imagePath} />
        </Suspense>
    )
}

export default Image;