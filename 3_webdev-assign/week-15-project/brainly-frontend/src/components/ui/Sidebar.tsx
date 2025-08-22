import { LogoIcon } from "../../icons/Logo";
import { TwitterBirdIcon } from "../../icons/TwitterBirdIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SiderbarItem } from "./SidebarItem";

export const Sidebar = () => {
  return (
    <div className=" top-0 left-0 px-6 position-fixed w-1/6 bg-white h-screen border-r-2">
      <div className="flex text-2xl pt-8 items-center font-extrabold mb-8">
        <LogoIcon size="xl" />
        <span className="pl-2">Brainly</span>
      </div>
      <div>
        <SiderbarItem text="Tweets" startIcon={<TwitterBirdIcon size="md" />} />
        <SiderbarItem text="Videos" startIcon={<YoutubeIcon size="md" />} />
        <SiderbarItem text="Documents" />
        <SiderbarItem text="Links" />
        <SiderbarItem text="Tags" />
      </div>
    </div>
  );
};
