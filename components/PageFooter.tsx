import React from 'react'

export default function PageFooter() {
return (
    <footer className='relative bottom-0 left-0 w-full mt-10 text-center text-gray-400'>
        <small className='mb-2 block text-xs'>
            &copy; 2024 Tran. All rights reserved.
        </small>

        <div className='text-xs'>
            <span className='font-semibold'>About this website:</span> built with Next.js, TypeScript, Tailwind CSS, SASS, and Framer Motion.<br/>Hosted by Vercel.
        </div>
        
    </footer>
)
}
