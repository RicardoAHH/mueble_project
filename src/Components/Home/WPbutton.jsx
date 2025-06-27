import React from 'react'
import { Link } from 'react-router'

export default function WPbutton() {
    return (
        <Link to='https://wa.me/+525534190508' target="_blank" rel="noopener noreferrer">
            <button className='w-[80px] cursor-pointer'>
                <img src="/wp.png" alt="wp" />
            </button>
        </Link>
    )
}
