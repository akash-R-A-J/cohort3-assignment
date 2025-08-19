import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

{
  /* how to define a generic prop here so that we can define it once and use it everywhere
          and we can also override some field if needed */
}

export const MainPage = () => {
  return (
    <div className="p-4 bg-black h-screen">
      <div className="flex justify-end">
        <Button
          variant="secondary"
          size="md"
          text="Share Brain"
          startIcon={<ShareIcon size="md" />}
          onClick={() => {
            console.log("Sharing this content.");
          }}
        />
        <Button
          variant="primary"
          size="lg"
          text="Add Content"
          startIcon={<PlusIcon size="lg" />}
          onClick={() => {
            console.log("Adding the content.");
          }}
        />
      </div>

      <div className="flex gap-4">
        <Card
          title="Vintage with Palki Sharma"
          link="https://www.youtube.com/watch?v=Ds_71v8o3f0"
          type="youtube"
        />
        {/* <div className="m-5 h-24"></div> */}
        <Card
          title="Elon's warning"
          link="https://x.com/elonmusk/status/1957686305774878927"
          type="twitter"
        />
      </div>
    </div>
  );
};
