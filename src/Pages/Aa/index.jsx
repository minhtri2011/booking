import React from 'react'

export default function Aa(props) {
    const hand=()=>{
        console.log(props);
    }
    return (
        <div>
            <button onClick={()=>{hand()}}>click</button>
        </div>
    )
}
