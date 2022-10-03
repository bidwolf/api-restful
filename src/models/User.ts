import { Schema, model } from "mongoose";
export interface IUser {
  age: Number;
  login: String;
  name: String;
  password: String;
}
const UserSchema = new Schema<IUser>({
  age: { type: Number, required: true },
  login: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
})

const User = model<IUser>('User', UserSchema);
export default User;