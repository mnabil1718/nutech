import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import AppRoutes from '@/routes'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { store } from '@/store/index'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AppRoutes />
                <Toaster theme='dark' position='bottom-left' />
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
