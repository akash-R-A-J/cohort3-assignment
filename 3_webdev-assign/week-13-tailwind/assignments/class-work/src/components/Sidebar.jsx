import { ButtonTransition } from "./Transition";

export const Sidebar = () => {
  return (
    <div className="flex h-screen text-center text-white text-2xl ">
      {/* sidebar main content */}
      <div className="bg-red-400 text-left ease-in-out transition-all delay-200 duration-500 w-0 md:w-1/4 md:p-5">
        <ButtonTransition value={"Home"} />
        <ButtonTransition value={"Blogs"} />
        <ButtonTransition value={"Products"} />
        <ButtonTransition value={"Careers"} />
        <ButtonTransition value={"About Us"} />
      </div>
      <div className="bg-green-200 w-full md:w-3/4">Content</div>
    </div>
  );
};
