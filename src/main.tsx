import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import AppRoutes from '@/routes'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            {/* <App /> */}
            <AppRoutes />
            <Toaster theme='dark' position='bottom-left' />
        </BrowserRouter>
    </StrictMode>,
)
