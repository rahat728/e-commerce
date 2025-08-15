import React from 'react'
import { NavLink } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Plus, 
  List, 
  ShoppingCart, 
  Package, 
  LayoutDashboard,
  ChevronRight,
  Store
} from 'lucide-react'

const Sidebar = () => {
  return (
    <Card className="w-64 min-h-screen rounded-none border-r shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Store className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Admin Panel</CardTitle>
            <p className="text-xs text-muted-foreground">Manage your store</p>
          </div>
        </div>
      </CardHeader>
      
      <Separator />
      
      <CardContent className="p-0">
        <div className="space-y-1 px-4 py-4">
          <NavLink
            to='/add'
            className={({ isActive }) =>
              `flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <Plus className="h-4 w-4" />
              <span>Add Items</span>
            </div>
            {({ isActive }) => isActive && <ChevronRight className="h-4 w-4" />}
          </NavLink>
          
          <NavLink
            to='/list'
            className={({ isActive }) =>
              `flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <List className="h-4 w-4" />
              <span>List Items</span>
            </div>
            {({ isActive }) => isActive && <ChevronRight className="h-4 w-4" />}
          </NavLink>
          
          <NavLink
            to='/orders'
            className={({ isActive }) =>
              `flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-4 w-4" />
              <span>Orders</span>
            </div>
            {({ isActive }) => isActive && <ChevronRight className="h-4 w-4" />}
          </NavLink>
        </div>
        
        <Separator />
        
        <div className="px-4 py-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Quick Stats
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-accent p-3">
              <div className="text-xs text-muted-foreground">Products</div>
              <div className="text-lg font-bold">24</div>
            </div>
            <div className="rounded-lg bg-accent p-3">
              <div className="text-xs text-muted-foreground">Orders</div>
              <div className="text-lg font-bold">12</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Sidebar