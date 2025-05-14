import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/index.ts'
import { SocketProvider } from './utilities/socket/SocketContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <SocketProvider>
    <App />
    </SocketProvider>
    </Provider>
  </StrictMode>,
)
