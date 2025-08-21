import { useState } from "react";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { CreateContentModal } from "./components/ui/CreateContentModal";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { Sidebar } from "./components/ui/Sidebar";

{
  /* how to define a generic prop here so that we can define it once and use it everywhere
          and we can also override some field if needed */
}

export const MainPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-4 bg-[#eeeeef] min-h-screen w-screen">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)} // after clicking on cross icon, it will close the modal
        />
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
              setModalOpen(true);
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
            title="My Journey"
            link="https://x.com/AKASH_Ra_aj/status/1924154032173789445"
            type="twitter"
          />
        </div>
      </div>
    </div>
  );
};
