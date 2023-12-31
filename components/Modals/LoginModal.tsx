import { useCallback, useState } from "react";
import { useLoginModal } from "@/Hooks/useLoginModal";
import { Input } from "../Input";
import { Modal } from "../Modal";
import { useRegisterModal } from "@/Hooks/useRegisterModal";


export const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            /* Add log in */
            //await sign in
            loginModal.onClose()
        } catch (error) {
            console.log(error);

        } finally{
            setIsLoading(false)
        }
        
    }, [loginModal])

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }
        loginModal.onClose();
        registerModal.onOpen();
        
    }, [isLoading, registerModal, loginModal]);

    const bodyContent = (
        <div className="flex flex-col galp-4">
            <Input 
            placeHolder="Email"
            onChange={e=>setEmail(e.target.value)}
            value={email}
            disable={isLoading}
           />
           <Input 
            placeHolder="Password"
            onChange={e=>setPassword(e.target.value)}
            value={password}
            disable={isLoading}
           />
        </div>
    )
    const footerContent = (
        <div className='text-neutral-400 text-center mt-4'>
            <p>First time using X? </p>
            <span
                onClick={onToggle}
                className="
            text-white
            cursor-pointer
            hover:underline
            "> Create an account </span>
        </div>
    )

    return (
        <Modal 
        disable={isLoading}
        isOpen={loginModal.isOpen}
        title='Login'
        actionLabel="Sign In"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
        />
    )
}
