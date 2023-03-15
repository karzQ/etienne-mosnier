import './Image.css'

import React, { Suspense, useEffect, useState } from "react";

const Image = (props: any) => {
    const {src, dir} = props
    const [imagePath, setImagePath] = useState(src);
    useEffect(() => {
        if (dir) {
            (async () => {
                let path: any = null
                if (dir) {
                    path = await import(`../../assets/img/${dir}/${src}.jpg`);
                } else {
                    path = await import(`../../assets/img/${src}.jpg`);
                }
                setImagePath(path.default);
            })();
        }
    }, [src])

    return (
        <Suspense fallback='Loading..'>
            <img className="image" src={imagePath} />
            
        </Suspense>
    )
}

export default Image;