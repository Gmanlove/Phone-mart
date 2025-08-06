"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { CartItem } from "./cart-context"

export interface Order {
  id: string
  date: string
  items: CartItem[]
  total: number
  status: string
  name?: string
  email?: string
  phone?: string
  address?: string
}

interface OrderContextType {
  orders: Order[]
  placeOrder: (items: CartItem[], total: number, customerInfo?: {
    name: string
    email: string
    phone: string
    address: string
  }) => Promise<void>
  isLoading: boolean
}

const OrderContext = createContext<OrderContextType | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('orders')
      if (data) setOrders(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('orders', JSON.stringify(orders))
    }
  }, [orders])

  const placeOrder = async (items: CartItem[], total: number, customerInfo?: {
    name: string
    email: string
    phone: string
    address: string
  }) => {
    console.log('PlaceOrder called with:', { items, total, customerInfo })
    
    setIsLoading(true)
    try {
      // Validate required fields
      if (!customerInfo?.name || !customerInfo?.email || !customerInfo?.phone || !customerInfo?.address) {
        console.error('Missing customer info:', customerInfo)
        throw new Error('Customer information is required')
      }

      if (!items || items.length === 0) {
        console.error('No items in order')
        throw new Error('Order must contain at least one item')
      }

      if (!total || total <= 0) {
        console.error('Invalid total:', total)
        throw new Error('Order total must be greater than 0')
      }

      // Prepare order data for backend
      const orderData = {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity
        })),
        total
      }

      console.log('Sending order data to backend:', orderData)

      // Send order to backend
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })

      console.log('Backend response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Backend error:', errorData)
        throw new Error(`Failed to create order: ${errorData.error || response.statusText}`)
      }

      const result = await response.json()
      console.log('Order created successfully:', result)
      
      // Create local order for immediate UI update
      const newOrder: Order = {
        id: result.order._id || 'PH-' + Date.now(),
        date: new Date().toISOString().slice(0, 10),
        items,
        total,
        status: result.order.status || 'processing',
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address
      }
      
      setOrders([newOrder, ...orders])
      console.log('Order placed successfully:', result.order)
    } catch (error) {
      console.error('Error placing order:', error)
      
      // Fallback to local storage if backend fails
      const fallbackOrder: Order = {
        id: 'PH-' + Date.now(),
        date: new Date().toISOString().slice(0, 10),
        items,
        total,
        status: 'processing',
        name: customerInfo?.name,
        email: customerInfo?.email,
        phone: customerInfo?.phone,
        address: customerInfo?.address
      }
      setOrders([fallbackOrder, ...orders])
      
      // Re-throw error for UI handling
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OrderContext.Provider value={{ orders, placeOrder, isLoading }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) throw new Error('useOrders must be used within an OrderProvider')
  return context
}
