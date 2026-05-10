import React from 'react'

export default function PageFooter() {
return (
    <footer className='relative bottom-0 left-0 w-full mt-10 text-center text-gray-400'>
        <small className='mb-2 block text-xs'>
            &copy; 2026 Tran. All rights reserved.
        </small>

        <div className='text-xs'>
            <span className='font-semibold'>About this website:</span> built with Next.js, TypeScript, Tailwind CSS, SASS, and Framer Motion.<br/>Hosted by Vercel.
        </div>

        <div className='text-xs mt-3'>
            Having a feedback? Please visit <a href='https://ktran.app' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:text-blue-300 underline'>ktran.app</a>
        </div>
        
    </footer>
)
}
