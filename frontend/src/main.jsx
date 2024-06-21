import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import App from "./App.jsx"

// 1. Import the extendTheme function
import * as ReactDOM from "react-dom/client"

const rootElement = document.getElementById("root")
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </React.StrictMode>
)
