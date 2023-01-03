import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'

//api here is an axios instance which has the baseURL set according to the env.
import urls from 'constants/api';
import axios from 'axios';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            console.log(token)
            if (token && token != undefined) {

                const {data: data} = await axios.get(`${urls['test']}/user/me`, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                } )
                setUser(data)
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])

    const login = async (email, password) => {
        const token = Cookies.get('token')

        if(!token ) {
            const {data: data} = await axios.post(`${urls['test']}/auth/login`, { email, password })
        
        if (data?.token) {
            Cookies.set('token', data.token)
            
            setUser(data.user)
            window.location.pathname = '/account'
        }}
    }

    const logout = () => {
        Cookies.remove('token')
        setUser(null)
        window.location.pathname = '/login'
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)