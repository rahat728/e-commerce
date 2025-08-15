import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search, X } from 'lucide-react'

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
    const [visible, setVisible] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location])

    if (!showSearch || !visible) {
        return null
    }

    return (
        <div className="w-full py-4 bg-white border-b shadow-sm">
            <div className="container mx-auto px-4">
                <Card className="mx-auto max-w-2xl shadow-sm">
                    <CardContent className="p-0">
                        <div className="flex items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search for products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="border-0 pl-10 pr-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowSearch(false)}
                                className="ml-2 h-10 w-10 p-0"
                            >
                                <X className="h-5 w-5" />
                                <span className="sr-only">Close search</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SearchBar