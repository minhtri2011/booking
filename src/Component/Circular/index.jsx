import React from 'react';
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AnimatedProgressProvider from "../AnimationProgressProvider";
import { easeBackOut } from "d3-ease";
export default function Circular(props) {
    let { percentValue } = props;
    
    //xử lí lỗi undefine value cho circular khi props chưa trả về kip
    if (percentValue) {
        return (
                        <AnimatedProgressProvider
                            valueStart={0}
                            valueEnd={percentValue*10}
                            duration={3}
                            easingFunction={easeBackOut}
                        >
                            {value => {
                                const roundedValue = Math.round(value) / 10;
                                return (
                                    <CircularProgressbar
                                        value={value}
                                        text={`${roundedValue.toFixed(1)}`}
                                        styles={buildStyles({ pathTransition: "none" })}
                                    />
                                );
                            }}
                        </AnimatedProgressProvider>
        )
    } else return <></>
}
