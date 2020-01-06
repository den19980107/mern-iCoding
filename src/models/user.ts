import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
  displayName: {
    type: String
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    require: true
  },
  accountType: {
    type: String,
    require: true
  },
  accountId: {
    type: String
  }
};

let userSchema = new mongoose.Schema({
  displayName: {
    type: String
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    require: true
  },
  accountType: {
    type: String,
    require: true
  },
  accountId: {
    type: String
  }
})

declare module "express" {
  export interface Request {
    user: UserDocument
  }
}

export const User = mongoose.model<UserDocument>("User", userSchema);
