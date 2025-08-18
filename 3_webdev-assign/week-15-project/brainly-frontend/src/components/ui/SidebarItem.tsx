interface SidebarItemProps {
  text: string;
  startIcon?: React.ReactNode; // can be ReactElement or string, covers both
  onClick?: () => void;
}

const defaultStyles = "rounded-md p-2 m-1 flex mx-auto items-center";

export const SiderbarItem = (props: SidebarItemProps) => {
  return (
    <div className={`${defaultStyles} `} onClick={() => props.onClick}>
      {props.startIcon && <span className="mr-2">{props.startIcon}</span>}
      {props.text}
    </div>
  );
};
