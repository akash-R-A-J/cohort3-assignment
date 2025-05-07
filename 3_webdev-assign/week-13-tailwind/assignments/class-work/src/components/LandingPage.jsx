import { useEffect, useState } from "react";
import { SidebarToggle } from "./SidebarToggle";

export const LandingPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  useEffect(() => {
    if(isDesktop === false){
        setSidebarOpen(false);
    }else{
        setSidebarOpen(true);
    }
  }, [isDesktop])
  
  return (
    <div className="flex">
      <Sidebar3 sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <MainContent sidebarOpen={sidebarOpen} />
    </div>
  );
};

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    
    useEffect(() => {
        const media = window.matchMedia(query);
        if(media.matches !== matches){
            setMatches(media.matches);
        }
        
        const listener = () => setMatches(media.matches);
        media.addListener(listener);
        
        return () =>  media.removeListener(listener);
        
    }, [query, matches]);
    
    return matches;
}

const Sidebar3 = ({ sidebarOpen, setSidebarOpen }) => {
  if (!sidebarOpen) {
    return (
        <div className="fixed top-0 right-0">
          <div
            className="cursor-pointer bg-slate hover:bg-slate-200 rounded-md mt-1 mr-1 p-2"
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <SidebarToggle />
          </div>
        </div>
      );
  }
  return (
    <div className="w-1/5 h-screen bg-red-100 fixed md:relative top-0 left-0">
      <div
        className="cursor-pointer hover:bg-slate-200 p-2"
        onClick={() => {
          setSidebarOpen(!sidebarOpen);
        }}
      >
        <SidebarToggle />
      </div>
    </div>
  );
};

const MainContent = ({sidebarOpen}) => {
  return (
    <div className="w-full">
      <div className="h-45 bg-black hidden md:block"></div>
      <div className="grid grid-cols-11 gap-8 p-8">
        <div className="h-50 rounded-2xl shadow-lg bg-red-200 col-span-2 -translate-y-32 hidden md:block"></div>
        <div className="h-50 rounded-2xl shadow-lg bg-green-200 col-span-11 md:col-span-6"></div>
        <div className="h-50 rounded-2xl shadow-lg bg-yellow-200 col-span-11 md:col-span-3"></div>
      </div>
    </div>
  );
};
