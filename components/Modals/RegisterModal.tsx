import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react'

import { useRegisterModal } from "@/Hooks/useRegisterModal";
import { useLoginModal } from "@/Hooks/useLoginModal";

import { Input } from "../Input";
import { Modal } from "../Modal";

export const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            
            
            await axios.post('/api/register', {
                email,
                password,
                username,
                name
            }
            )
            
            console.log("onSubmit function executed")
            toast.success('Acount Created' )

            signIn('credentials',{
                /* email,
                password */
            })

            registerModal.onClose()
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')

        } finally {
            setIsLoading(false)
        }
    }, [registerModal, email, password, username, name])


    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }
        registerModal.onClose();
        loginModal.onOpen();

    }, [isLoading, registerModal, loginModal]);

    const bodyContent = (
        <div className="flex flex-col galp-4">
            <Input
                placeHolder="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                disable={isLoading}
            />
            <Input
                placeHolder="Name"
                onChange={e => setName(e.target.value)}
                value={name}
                disable={isLoading}
            />
            <Input
                placeHolder="Username"
                onChange={e => setUsername(e.target.value)}
                value={username}
                disable={isLoading}
            />
            <Input
                placeHolder="Password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                disable={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className='text-neutral-400 text-center mt-4'>
            <p>Already have an account? </p>
            <span
                onClick={onToggle}
                className="
            text-white
            cursor-pointer
            hover:underline
            "> Sign in </span>
        </div>
    )

    return (
        <Modal
            disable={isLoading}
            isOpen={registerModal.isOpen}
            title='Create an account'
            actionLabel="Register"
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    )
}
