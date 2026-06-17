import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <h1>🐙 OctoFit Tracker</h1>
      <p>Your AI-powered fitness companion powered by GitHub Copilot</p>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <p>Frontend running on port 5173</p>
    </div>
  )
}

export default App
