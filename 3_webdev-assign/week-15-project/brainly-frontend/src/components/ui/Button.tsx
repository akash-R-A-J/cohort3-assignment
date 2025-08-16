// this interface means what input the button will accept
export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon: any; // should be ReactElement (it can be other react element)
  endIcon: any; // should be ReactElement (it can be other react element)
}

export const Button = () => {};
