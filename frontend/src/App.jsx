import { useState } from "react"
import "./App.css"
import Login from "./views/Login"
import Home from "./views/Home"
// import Navbar from "./components/Navbar"

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Home />
        </>
    )
}

export default App
