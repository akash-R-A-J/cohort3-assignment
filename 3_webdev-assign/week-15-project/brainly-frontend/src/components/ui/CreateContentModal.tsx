import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";

// How you will add this: when a user will click outside this modal, the modal should close
// -> add a onOutSide click handler

// COMPLETE THIS COMPONENT

// controlled component => means the task will come from the parent component
export const CreateContentModal = ({ open, onClose }) => {
  // whenever user clicks on the cross icon, this modal should close
  return (
    <>
      {open && (
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
          <div className="flex flex-col justify-center opacity-100">
            <span className="bg-white opacity-100 p-4 rounde-md">
              <div
                className="flex justify-end cursor-pointer"
                onClick={onClose}
              >
                <CrossIcon size="md" />
              </div>
              <div>
                <Input onChange={() => {}} placeholder={"Title"} />
                <Input onChange={() => {}} placeholder={"Link"} />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  text="Submit"
                  size="md"
                  onClick={() => {}}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

const Input = ({ onChange, placeholder }: { onChange: () => void }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="px-4 py-2 rounded-md border m-2"
      />
    </div>
  );
};
