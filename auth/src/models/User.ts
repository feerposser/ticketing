import mongoose from "mongoose";
import { Password } from "../services/Password";

// interface that describes the props for a new user
interface UserAtributes {
  email: string;
  password: string;
}

// interface that describes the props of a User Model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAtributes): UserDoc;
}

// interface that describes the props of a User Document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", async function(done) {
  if(this.isModified("password")){
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAtributes) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User as UserModel };