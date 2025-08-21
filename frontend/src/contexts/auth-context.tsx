"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  email: string
  isAdmin: boolean
  token?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuth = () => {
    // Check if user is logged in from localStorage
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const userEmail = localStorage.getItem("userEmail")
    const isAdmin = localStorage.getItem("isAdmin")
    
    const token = localStorage.getItem("token")
    
    // Backend currently doesn't always return a token on signin.
    // Treat the presence of the isLoggedIn flag + userEmail as sufficient
    // to restore the authenticated user in the client. Token is optional.
    if (isLoggedIn === "true" && userEmail) {
      setUser({
        email: userEmail,
        isAdmin: isAdmin === "true",
        token: token || undefined,
      })
    } else {
      setUser(null)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://smartcoms.onrender.com"
      const res = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await res.json()
      
      // Backend currently returns { message, isAdmin } on success and may not include a token.
      // Treat any successful (2xx) response as a successful login.
      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userEmail", email)
        localStorage.setItem("isAdmin", data.isAdmin ? "true" : "false")
        // Backend may not return a JWT token. Persist a token key (empty string)
        // to keep localStorage consistent for the client-side auth checks.
        const tokenToStore = data.token || ""
        localStorage.setItem("token", tokenToStore)

        setUser({
          email,
          isAdmin: data.isAdmin || false,
          token: data.token || undefined,
        })

        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("token")
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkAuth
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}