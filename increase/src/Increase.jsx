import React, { useState } from 'react'

const Increase = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <div>

            {count}
            </div>
            <button onClick={()=>setCount(count+1)}>Click me</button>
        </div>
    )
}

export default Increase
