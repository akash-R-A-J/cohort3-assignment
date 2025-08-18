import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { SiderbarItem } from "./components/ui/SidebarItem";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { TwitterIcon } from "./icons/TwitterIcon";

export const MainPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-blue text-center text-3xl pt-10 mt-25">
        Hello Guys!
      </h1>
      {/* how to define a generic prop here so that we can define it once and use it everywhere
          and we can also override some field if needed */}
      <Button
        variant="primary"
        size="lg"
        text="Add Content"
        startIcon={<PlusIcon size="lg" />}
        onClick={() => {
          console.log("Adding the content.");
        }}
      ></Button>
      <Button
        variant="secondary"
        size="md"
        text="Share Brain"
        startIcon={<ShareIcon size="md" />}
        onClick={() => {
          console.log("Sharing this content.");
        }}
      ></Button>
      <SiderbarItem
        text="Tweets"
        startIcon={<TwitterIcon size="md" />}
        onClick={() => {
          console.log("Hello from sidebar item.");
        }}
      />
      <Card
        header="How to get a web-3 job"
        type="youtube"
        link="www.youtube.com"
      />
      <Card
        header="How to get a web-3 job"
        type="youtube"
        link="www.youtube.com"
      />
      <Card
        header="How to get a web-3 job"
        type="youtube"
        link="www.youtube.com"
      />
    </div>
  );
};
