import React, {useEffect, useState} from "react";

const Preloader = () => {
    const [progress, setProgress] = useState('.')
    useEffect(() => {
        let value = progress
        const timer = setInterval(() => {
            value = new Array(1 + value.length % 3).fill('.').join('')
            setProgress(value)
        }, 500)
        return () => {
            clearInterval(timer)
        }
    }, [])
    return (
        <div className="site-loading">
            <div className="site-loading-text">Loading{progress}</div>
        </div>
    )
}

export default Preloader
