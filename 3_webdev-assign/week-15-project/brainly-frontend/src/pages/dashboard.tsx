import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/ui/Sidebar";
import { useContent } from "../components/hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

{
  /* how to define a generic prop here so that we can define it once and use it everywhere
          and we can also override some field if needed */
}

// add a logout button

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, fetchContents } = useContent();

  // should fetch content after closing the add content modal
  useEffect(() => {
    fetchContents();
  }, [modalOpen]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-4 bg-[#eeeeef] min-h-screen w-screen">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)} // after clicking on cross icon, it will close the modal
        />
        <div className="flex justify-end">
          {/* will share the complete brain */}
          <Button
            variant="secondary"
            size="md"
            text="Share Brain"
            startIcon={<ShareIcon size="md" />}
            onClick={async () => {
              const respone = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                { share: true },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              const shareUrl = `http://localhost:5173/share/${respone.data.hash}`;
              alert(shareUrl);
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
          {contents.length === 0 ? (
            <p>No contents available.</p>
          ) : (
            contents.map(({ title, link, type }, index) => (
              <div id={index + link + ""}>
                <Card title={title} link={link} type={type} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
