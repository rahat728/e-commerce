import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const [verificationStatus, setVerificationStatus] = useState('loading') // loading, success, error
    const [errorMessage, setErrorMessage] = useState('')
    
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    
    const verifyPayment = async () => {
        try {
            if (!token) {
                setVerificationStatus('error')
                setErrorMessage('Please login to verify your payment')
                return
            }
            
            const response = await axios.post(`${backendUrl}/api/order/verifyStripe`, {orderId, success}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (response.data.success) {
                setVerificationStatus('success')
                setCartItems(response.data.cartData)
                
                // Delay redirect slightly to show success message
                setTimeout(() => {
                    navigate('/orders')
                }, 2000)
            } else {
                setVerificationStatus('error')
                setErrorMessage(response.data.message || 'Payment verification failed')
                
                // Delay redirect slightly to show error message
                setTimeout(() => {
                    navigate('/cart')
                }, 3000)
            }
        } catch (error) {
            console.error("Payment verification failed:", error)
            setVerificationStatus('error')
            setErrorMessage('An error occurred while verifying your payment')
            
            // Delay redirect slightly to show error message
            setTimeout(() => {
                navigate('/cart')
            }, 3000)
        }
    }
    
    useEffect(() => {
        verifyPayment()
    }, [token])
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Payment Verification</CardTitle>
                    <CardDescription>
                        Please wait while we verify your payment
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-6">
                    {verificationStatus === 'loading' && (
                        <div className="flex flex-col items-center space-y-4">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            <p className="text-center text-gray-600">
                                Verifying your payment...
                            </p>
                        </div>
                    )}
                    
                    {verificationStatus === 'success' && (
                        <div className="flex flex-col items-center space-y-4">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                            <p className="text-center text-gray-600">
                                Payment verified successfully! Redirecting to your orders...
                            </p>
                        </div>
                    )}
                    
                    {verificationStatus === 'error' && (
                        <div className="flex flex-col items-center space-y-4">
                            <XCircle className="h-12 w-12 text-red-500" />
                            <p className="text-center text-gray-600">
                                {errorMessage || 'Payment verification failed'}
                            </p>
                            <p className="text-center text-sm text-gray-500">
                                Redirecting back to cart...
                            </p>
                        </div>
                    )}
                    
                    {(verificationStatus === 'error' || verificationStatus === 'success') && (
                        <div className="mt-6 w-full">
                            <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={() => navigate(verificationStatus === 'success' ? '/orders' : '/cart')}
                            >
                                {verificationStatus === 'success' ? 'View Orders' : 'Return to Cart'}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default Verify