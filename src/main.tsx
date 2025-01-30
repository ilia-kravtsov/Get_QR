import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App/App.tsx'
import './styles/reset.css';
import './styles/variables.css';
import './assets/fonts/stylesheet.css'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {ThemeProvider} from "./components/App/Theme/ThemeProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
