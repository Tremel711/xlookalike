import { useRouter } from 'next/router'
import { DiReact } from 'react-icons/di';
import React from 'react'

export const SideBarLogo = () => {
    const router = useRouter();


    return (
        <div onClick={() => { router.push('/') }}
            className='
    rounded-full
    h-14
    w-14
    p-4
    flex
    items-center
    justify-center
    hover:bg-opacity-10
    cursor-pointer
    transition
    '>
            <DiReact size={28} color='white' />
        </div>
    )
}
