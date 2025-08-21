interface SidebarItemProps {
  text: string;
  startIcon?: React.ReactNode; // can be ReactElement or string, covers both
  onClick?: () => void;
}

const defaultStyles = "pl-4 py-1 flex mx-auto items-center font-medium cursor-pointer hover:bg-gray-300 hover:rounded-md";

export const SiderbarItem = (props: SidebarItemProps) => {
  return (
    <div className={`${defaultStyles} `} onClick={() => props.onClick}>
      {props.startIcon && <span className="mr-2">{props.startIcon}</span>}
      {props.text}
    </div>
  );
};
