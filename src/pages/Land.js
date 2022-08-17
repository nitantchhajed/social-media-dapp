import React, { useState, useEffect, useRef } from 'react'
import RINGS from 'vanta/dist/vanta.rings.min'
import { ConnectButton } from 'web3uikit'
import "./Land.css"

import * as THREE from "three";

const Land = () => {
    const [vantaEffect, setVantaEffect] = useState(0);
    const vantaRef = useRef(null);
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                RINGS({
                    el: vantaRef.current,
                    THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    backgroundColor: 0x2,
                    color: 0xd40000
                }));
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    return <div className="container" ref={vantaRef}>
        <div className="cd">
            <ConnectButton />

        </div>

    </div>

}

export default Land;