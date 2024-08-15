"use client"

import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div className="border bg-darkBlue p-2 font-size-24px">
            <Link href="/">
                <h1 className="text-skyBlue text-2xl">
                    Tournamax <span className="text-sunsetOrange text-lg">Assignment</span>
                </h1></Link>
        </div>
    )
}
