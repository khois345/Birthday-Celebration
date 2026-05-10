import React from 'react'
import { Locale, getTranslations } from '@/i18n/translations';

interface PageFooterProps {
    locale: Locale;
}

export default function PageFooter({ locale }: PageFooterProps) {
const texts = getTranslations(locale);
return (
    <footer className='relative bottom-0 left-0 w-full mt-10 text-center text-gray-400'>
        <small className='mb-2 block text-xs'>
            &copy; 2026 Tran. {texts.footer.rights}
        </small>

        <div className='text-xs'>
            <span className='font-semibold'>{texts.footer.aboutTitle}</span> {texts.footer.builtWith}<br/>{texts.footer.hostedBy}
        </div>

        <div className='text-xs mt-3'>
            {texts.footer.feedback} <a href='https://ktran.app' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:text-blue-300 underline'>ktran.app</a>
        </div>
        
    </footer>
)
}
