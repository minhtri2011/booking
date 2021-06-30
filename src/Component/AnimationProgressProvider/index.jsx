import React, { useState, useEffect } from "react";
import { Animate } from "react-move";

export default function AnimatedProgressProvider(props) {
    let { repeat, duration, valueEnd, valueStart, easingFunction } = props;
    let [ isAnimated, setIsAnimated ] = useState(false);
    // let { valueStart } = useState(0);
    // let interval = undefined;

    useEffect(() => {
        if (repeat) {
            const interval = setInterval(() => {
                setIsAnimated(!isAnimated);
            }, duration*1000);
            return () => clearInterval(interval);
        } else {
            setIsAnimated(!isAnimated);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Animate
            start={() => ({
                value: valueStart
            })}
            update={() => ({
                value: [
                    isAnimated ? valueEnd : valueStart
                ],
                timing: {
                    duration: duration * 1000,
                    ease: easingFunction
                }
            })}
        >
            {({ value }) => props.children(value)}
        </Animate>
    )
}





// export default AnimatedProgressProvider;
