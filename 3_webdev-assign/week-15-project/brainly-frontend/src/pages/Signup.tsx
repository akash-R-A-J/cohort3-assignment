import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { InputField } from "../components/ui/InputField";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// minimal signup page
export const Signup = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function signup() {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });

      // display message based on the status code received from the backend
      console.log(res.data);

      // navigate to signin after signup
      navigate("/signin");
    } catch (error) {
      console.error("Invalid response", error);
    }
  }
  return (
    <div className="h-screen w-screen flex bg-gray-200 justify-center items-center">
      <div className="bg-white rounded-xl min-w-48 px-8 pt-8">
        <InputField reference={usernameRef} placeholder="Username" />
        <InputField reference={passwordRef} placeholder="Password" />
        <div className="flex justify-center mt-4 pb-2">
          <Button
            variant="primary"
            text="Signup"
            size="md"
            fullWidth
            onClick={signup}
          />
        </div>
      </div>
    </div>
  );
};
