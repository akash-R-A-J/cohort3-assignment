import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { InputField } from "../components/ui/InputField";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

// minimal signup page
export const Signin = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signup = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });
      const token = response.data.token;
      // save token in the localstorage
      localStorage.setItem("token", token);
      console.log(token);
      console.log("singin successfully");

      // navigate to the dashboard after signin
      navigate("/dashboard");
    } catch (error) {
      console.error("error getting response", error);
    }
  };
  return (
    <div className="h-screen w-screen flex bg-gray-200 justify-center items-center">
      <div className="bg-white rounded-xl min-w-48 px-8 pt-8">
        <InputField reference={usernameRef} placeholder="Username" />
        <InputField reference={passwordRef} placeholder="Password" />
        <div className="flex justify-center mt-4 pb-2">
          <Button
            variant="primary"
            text="Signin"
            size="md"
            fullWidth
            onClick={signup}
          />
        </div>
      </div>
    </div>
  );
};
