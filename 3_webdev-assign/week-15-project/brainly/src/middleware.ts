import { z } from "zod";

// input validation for signup
const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" })
  .max(30, { message: "Password must not exceed 30 characters" })
  .regex(/[A-Z]/, { message: "Include at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Include at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Include at least one digit" })
  .regex(/[^A-Za-z0-9]/, { message: "Include at least one symbol" })
  .regex(/^\S+$/, { message: "Password must not contain spaces or tabs" });

/*   or we can just use this:
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/,
            { message: "Password must contain uppercase, lowercase, digit, symbol, and no spaces" }
        );    
  
*/

export const userSchema = z.object({
  username: z.string().min(3).max(50),
  password: passwordSchema,
});
