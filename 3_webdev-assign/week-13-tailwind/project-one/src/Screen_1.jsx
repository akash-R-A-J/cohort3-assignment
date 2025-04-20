import { Button } from "./components/Buttons";
import { Input } from "./components/Input";

/*
    Color used
    blue: {
          200: "#8094ad",
          500: "#19406a",
          700: "#002b5b",
        },
    green: {
      400: "#36c6c0",
    },
*/

export const Screen_1 = () => {
  return (
    <div className="h-screen bg-[#002b5b]">
      <Input type={"text"} placeHolder={"Your Birth Date"} />
      <Button disabled={false} children={"Continue"} />
    </div>
  );
};
