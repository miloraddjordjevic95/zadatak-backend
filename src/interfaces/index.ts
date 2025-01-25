import { Document } from "mongoose";

// Interface IUser
interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export { IUser };
