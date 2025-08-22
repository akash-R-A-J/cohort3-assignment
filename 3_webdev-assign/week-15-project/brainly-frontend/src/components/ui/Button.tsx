// this interface means what input the button will accept
interface ButtonProps {
  variant: "primary" | "secondary"; // map can be used for more options
  size: "sm" | "md" | "lg"; // including text size
  text: string;
  fullWidth?: boolean;
  textColor?: string; // should be optional and white by default
  startIcon?: React.ReactNode; // can be ReactElement or string, covers both
  endIcon?: React.ReactNode; // can be ReactElement or string, covers both
  className?: string;
  loading?: boolean;
  onClick: () => void;
}

// used for type safety and consistency
const sizeClasses: Record<ButtonProps["size"], string> = {
  sm: "text-sm px-2 py-1",
  md: "text-base px-4 py-2", // md not supported, so it should be base
  lg: "text-lg px-6 py-3",
};

const variantStyles: Record<ButtonProps["variant"], string> = {
  primary: "bg-blue-700 hover:bg-blue-800",
  secondary: "bg-blue-400 hover:bg-blue-500",
};

const defaultStyles =
  "flex rounded-md m-2 font-light justify-center items-center";

// generic button component
export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`
        ${variantStyles[props.variant]}
        ${sizeClasses[props.size]}
        ${defaultStyles}
        ${props.fullWidth && "w-full"}
        ${props.loading && "opacity-40 bg-blue-800"}
        ${props.textColor ?? "text-white"}
        ${props.className ?? ""}`} // this shouldn't be here, we are building generic button
      onClick={props.onClick}
      disabled={props.loading}
    >
      {/* how to pass size to the icon component from here (below) we only have to pass 
          the size only once while rendering this component somthing like this: */}
      {/* <span><Component component={props.startIcon} size={props.size}></Component></span> */}
      {/* const Comp = props.startIcon | "button"; // button is working but porps.startIcon isn't, why? */}

      {props.startIcon && <span className="mr-2">{props.startIcon}</span>}
      {props.text}
      {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
    </button>
  );
};
