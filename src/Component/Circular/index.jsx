import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import AnimatedProgressProvider from "./AnimatedProgressProvider";
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from 'd3-ease';

export default function Circular() {
    const percentage = 66;
    return (
        <CircularProgressbar minValue={0} maxValue={66} text={`${percentage}%`} />
    )
}
