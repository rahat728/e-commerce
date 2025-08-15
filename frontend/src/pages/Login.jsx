// frontend/src/pages/Login.jsx
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'

// Firebase imports
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [formLoading, setFormLoading] = useState(false)

  // Handle auth results after a redirect-based Google sign-in
  useEffect(() => {
    (async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result?.user) {
          const idToken = await result.user.getIdToken()
          const { data } = await axios.post(`${backendUrl}/api/user/auth/google`, { idToken })
          if (data?.success && data?.token) {
            setToken(data.token)
            localStorage.setItem('token', data.token)
            toast.success('Signed in with Google')
            navigate('/cart')
          } else {
            toast.error(data?.message || 'Google sign-in failed')
          }
        }
      } catch (e) {
        console.error(e)
        toast.error(e?.message || 'Google sign-in failed')
      }
    })()
  }, [backendUrl, navigate, setToken])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setFormLoading(true)
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Account created!')
        } else {
          toast.error(response.data.message || 'Sign up failed')
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          navigate('/cart')
        } else {
          toast.error(response.data.message || 'Login failed')
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || error.message || 'Something went wrong')
    } finally {
      setFormLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      if (googleLoading) return
      setGoogleLoading(true)

      // Prefer redirect on Safari/iOS where popups/3rd-party cookies are flaky
      const ua = navigator.userAgent || ''
      const isIOS = /iPad|iPhone|iPod/.test(ua)
      const isSafari = /^((?!chrome|android).)*safari/i.test(ua)
      if (isIOS || isSafari) {
        await signInWithRedirect(auth, googleProvider)
        return
      }

      // Try popup first
      const cred = await signInWithPopup(auth, googleProvider)
      const idToken = await cred.user.getIdToken()

      const { data } = await axios.post(`${backendUrl}/api/user/auth/google`, { idToken })
      if (data?.success && data?.token) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        toast.success('Signed in with Google')
        navigate('/cart')
      } else {
        toast.error(data?.message || 'Google sign-in failed')
      }
    } catch (err) {
      console.error(err)

      if (err?.code === 'auth/popup-closed-by-user') {
        toast.info('Sign-in canceled. You can try again.')
        return
      }

      if (
        err?.code === 'auth/popup-blocked' ||
        err?.code === 'auth/cancelled-popup-request' ||
        err?.code === 'auth/operation-not-supported-in-this-environment'
      ) {
        // Fall back to redirect if popup is blocked or not supported
        await signInWithRedirect(auth, googleProvider)
        return
      }

      toast.error(err?.response?.data?.message || err?.message || 'Google sign-in failed')
    } finally {
      setGoogleLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            {currentState === 'Login'
              ? 'Enter your credentials to access your account'
              : 'Create a new account to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={currentState} onValueChange={setCurrentState} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="Login">Login</TabsTrigger>
              <TabsTrigger value="Sign Up">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="Login" className="space-y-4">
              <form onSubmit={onSubmitHandler} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-xs"
                      type="button"
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={formLoading}>
                  {formLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogle}
                disabled={googleLoading}
              >
                {/* Google "G" SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" className="h-4 w-4">
                  <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h147.1c-6.4 34.7-25.8 64.2-55.1 83.9v69.7h88.9c52.1-47.9 80.6-118.5 80.6-198.5z"/>
                  <path fill="#34A853" d="M272 544.3c73 0 134.3-24.1 179.1-65.4l-88.9-69.7c-24.7 16.6-56.3 26.3-90.2 26.3-69.3 0-128-46.8-148.9-109.6H31.4v68.8C76.6 486.7 168.4 544.3 272 544.3z"/>
                  <path fill="#FBBC05" d="M123.1 325.9c-10.7-31.9-10.7-66.3 0-98.2v-68.8H31.4c-44.8 89.5-44.8 195.5 0 285z"/>
                  <path fill="#EA4335" d="M272 106.1c37.8-.6 74.2 13.8 101.9 40.5l76.1-76.1C403.6 24.6 340.9-1 272 0 168.4 0 76.6 57.6 31.4 162.9l91.7 68.8C144 152.9 202.7 106.1 272 106.1z"/>
                </svg>
                {googleLoading ? 'Connecting...' : 'Continue with Google'}
              </Button>
            </TabsContent>

            <TabsContent value="Sign Up" className="space-y-4">
              <form onSubmit={onSubmitHandler} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={formLoading}>
                  {formLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogle}
                disabled={googleLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" className="h-4 w-4">
                  <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h147.1c-6.4 34.7-25.8 64.2-55.1 83.9v69.7h88.9c52.1-47.9 80.6-118.5 80.6-198.5z"/>
                  <path fill="#34A853" d="M272 544.3c73 0 134.3-24.1 179.1-65.4l-88.9-69.7c-24.7 16.6-56.3 26.3-90.2 26.3-69.3 0-128-46.8-148.9-109.6H31.4v68.8C76.6 486.7 168.4 544.3 272 544.3z"/>
                  <path fill="#FBBC05" d="M123.1 325.9c-10.7-31.9-10.7-66.3 0-98.2v-68.8H31.4c-44.8 89.5-44.8 195.5 0 285z"/>
                  <path fill="#EA4335" d="M272 106.1c37.8-.6 74.2 13.8 101.9 40.5l76.1-76.1C403.6 24.6 340.9-1 272 0 168.4 0 76.6 57.6 31.4 162.9l91.7 68.8C144 152.9 202.7 106.1 272 106.1z"/>
                </svg>
                {googleLoading ? 'Connecting...' : 'Continue with Google'}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login