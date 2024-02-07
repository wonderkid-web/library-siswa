import Navbar from '@/components/costume/Navbar/Navbar'
import React from 'react'

export default function layout({children}) {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}
