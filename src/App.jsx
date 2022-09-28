import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-40 ml-5 p-5 border-b-2 border-b-cyan-200">
      Hello Realtor
    </div>
  )
}

export default App
