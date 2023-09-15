import { useCallback } from "react";
import { useRouter } from "next/router"
import { FaFeather } from "react-icons/fa";
import { useLoginModal } from "@/Hooks/useLoginModal";

export const SideBarTweetButton = () => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const onClick = useCallback(() => {
       loginModal.onOpen();
      
      },[loginModal])
    

  return (
    <div onClick={onClick}>
        <div
        className="
        mt-6
        lg:hidden
        rounded-full
        h-14
        w-14
        flex
        items-center
        justify-center
        bg-sky-500
        hover:bg-opacity-80
        transition
        cursor-pointer
        ">
            <FaFeather  size={24} color='white' />
        </div>
        
        <div className="
        mt-6
        hidden
        lg:block
        px-4
        py-4
        rounded-full
        bg-sky-500
        hover:bg-opacity-90
        cursor-pointer
        transition
        ">
            <p className="
            hidden
            lg:block
            text-center
            front-semibold
            text-white
            text-[20px]
            ">
            Comment
            </p>
        </div>
    </div>
  )
}
