import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { InputField } from "./InputField";
import { BACKEND_URL } from "../../config";
import axios from "axios";

// How you will add this: when a user will click outside this modal, the modal should close
// -> add a onOutSide click handler

// COMPLETE THIS COMPONENT
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

// controlled component => means the task will come from the parent component
export const CreateContentModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Twitter);
  const tagRef = useRef<HTMLInputElement>(null);

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const tag = tagRef.current?.value; // should be an array

    const tags = tag?.split(" ");

    console.log(type, title, link, tags);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { title, link, type, tags },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data.message);

      // close the modal after submitting 
      onClose();
    } catch (error) {
      console.error("error adding content", error);
    }
  };
  // whenever user clicks on the cross icon, this modal should close
  return (
    <>
      {open && (
        <div className="w-screen h-screen bg-slate-500/60 fixed top-0 left-0 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white p-4 rounded-md">
              <div
                className="flex justify-end cursor-pointer pb-2"
                onClick={onClose}
              >
                <CrossIcon size="lg" />
              </div>
              <div>
                <InputField reference={titleRef} placeholder={"Title"} />
                <InputField reference={linkRef} placeholder={"Link"} />
                <InputField reference={tagRef} placeholder={"Tags"} />
              </div>
              <div className="flex justify-center gap-1 p-4">
                <Button
                  text="Youtube"
                  size="md"
                  onClick={() => setType(ContentType.Youtube)}
                  variant={`${
                    type === ContentType.Youtube ? "primary" : "secondary"
                  }`}
                />
                <Button
                  text="Twitter"
                  size="md"
                  onClick={() => setType(ContentType.Twitter)}
                  variant={`${
                    type === ContentType.Twitter ? "primary" : "secondary"
                  }`}
                />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  text="Submit"
                  size="md"
                  onClick={addContent}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </>
  );
};
