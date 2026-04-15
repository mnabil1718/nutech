import { useAppDispatch, useAppSelector } from '@/store'
import { login } from '@/stores/auth'
import { useNavigate } from 'react-router'
import type { Login } from '../schemas/login.schema'

export const useLogin = () => {
    const dispatch = useAppDispatch()
    const { status, error } = useAppSelector((s) => s.auth)
    const navigate = useNavigate()

    const handleLogin = async (payload: Login) => {
        const result = await dispatch(login(payload))
        if (login.fulfilled.match(result)) {
            navigate('/dashboard')
        }
    }

    return { handleLogin, isLoading: status === 'loading', error }
}
