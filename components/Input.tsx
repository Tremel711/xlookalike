interface InputProps{
    placeHolder?:string;
    value?:string;
    type?:string;
    disable?:boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input : React.FC<InputProps> = ({
    placeHolder,
    value,
    type,
    disable,
    onChange
}) => {
  return (
    <input type="text" 
    disabled={disable}
    onChange={onChange}
    value={value}
    placeholder={placeHolder}
    type={type}
    className="
    w-full
    p-4
    text-lg
    bg-black
    border-2
    border-neutral-800
    rounded-md
    outline-none
    text-white
    focus:border-sky-500
    transition
    disabled:bg-neutral-900
    disabled:opacity-70
    disabled:cursor-not-allowed
    "
    />
  )
}
