export const Button = ({
  disabled, // wether it is disabled or not?
  children, // what should pI render inside the button
  onClick, // called when click on button
  variant, // for small or large button
}) => {
  return (
    <span
      onClick={onClick}
      className={`text-xl w-xs px-26 py-2 m-10 rounded-md text-white cursor-pointer ${disabled ? "bg-[#8094ad]" : "bg-[#36c6c0]"}`}
    >{children}
    </span>
  );
};
