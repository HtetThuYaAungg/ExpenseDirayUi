import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { AuthContextProvider } from './store/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContextProvider>

  </React.StrictMode>,
)
