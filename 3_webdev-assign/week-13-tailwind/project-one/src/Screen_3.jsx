// OTP form
import { Otp, OtpOptmized } from "./components/Otp";

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

export const Screen_3 = () => {
  return (
    <div className="h-screen bg-[#002b5b] flex justify-center">
      <Otp />
      <br /><br />
      <OtpOptmized number={7}/>
    </div>
  );
};
