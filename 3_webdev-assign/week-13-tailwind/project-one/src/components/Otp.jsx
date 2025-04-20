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

// controlled component

import { useRef, useState } from "react";
import { Button } from "./Buttons";

export const Otp = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const [disabled, setDisabled] = useState(true);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center m-5">
        <SubOtpBox
          reference={ref1}
          onDone={() => {
            ref2.current.focus();
          }}
        />
        <SubOtpBox
          reference={ref2}
          goBack={() => {
            ref1.current.focus();
          }}
          onDone={() => {
            ref3.current.focus();
          }}
        />
        <SubOtpBox
          reference={ref3}
          goBack={() => {
            ref2.current.focus();
          }}
          onDone={() => {
            ref4.current.focus();
          }}
        />
        <SubOtpBox
          reference={ref4}
          goBack={() => {
            ref3.current.focus();
          }}
          onDone={() => {
            ref5.current.focus();
          }}
        />
        <SubOtpBox
          reference={ref5}
          goBack={() => {
            ref4.current.focus();
          }}
          onDone={() => {
            ref6.current.focus();
          }}
        />
        <SubOtpBox
          reference={ref6}
          goBack={() => {
            ref5.current.focus();
          }}
          onDone={() => {
            setDisabled(false);
          }}
        />
      </div>
      <div className="ml-auto mr-auto">
        <Button disabled={disabled} children={"Verify OTP"}></Button>
      </div>
    </div>
  );
};

// optimized one for OTP
// render number of `number` boxes
export const OtpOptmized = ({ number }) => {
  const ref = useRef(Array(number).fill(0));
  const [disabled, setDisabled] = useState(true);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center m-5">
        {Array(number)
          .fill(1)
          .map((x, index) => (
            <SubOtpBox
              reference={(e) => (ref.current[index] = e)}
              key={index}
              onDone={() => {
                console.log(ref);
                console.log(index);
                if (index + 1 >= number) {
                  return;
                }
                ref.current[index + 1].focus();
              }}
              goBack={() => {
                if (index == 0) {
                  return;
                }
                ref.current[index - 1].focus();
              }}
            />
          ))}
      </div>
      <div className="ml-auto mr-auto">
        <Button disabled={disabled} children={"Verify OTP"}></Button>
      </div>
    </div>
  );
};

// small box component
const SubOtpBox = ({ reference, onDone, goBack }) => {
  const [inputBoxVal, setInputBoxVal] = useState("");

  return (
    <div>
      <input
        value={inputBoxVal}
        ref={reference}
        onKeyUp={(e) => {
          if (e.key == "Backspace") {
            if (inputBoxVal.length == 0) {
              goBack();
            } else {
              setInputBoxVal("");
            }
          }
        }}
        onChange={(e) => {
          const val = e.target.value.trim();
          if (!isNaN(val) && val.length == 1) {
            onDone();
            setInputBoxVal(val);
          }
        }}
        type="text"
        className="m-1 w-[40px] h-[50px] rounded-2xl outline-none px-4 text-white bg-[#19406a]"
      />
    </div>
  );
};
