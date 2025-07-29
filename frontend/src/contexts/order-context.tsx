"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { CartItem } from "./cart-context"

export interface Order {
  id: string
  date: string
  items: CartItem[]
  total: number
  status: string
}

interface OrderContextType {
  orders: Order[]
  placeOrder: (items: CartItem[], total: number) => void
}

const OrderContext = createContext<OrderContextType | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

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

  const placeOrder = (items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: 'PH-' + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      items,
      total,
      status: 'processing',
    }
    setOrders([newOrder, ...orders])
  }

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) throw new Error('useOrders must be used within an OrderProvider')
  return context
}
