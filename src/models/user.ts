import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { resolve, reject } from "bluebird";
import { modelHelper } from "./modelHelper";
export type UserDocument = mongoose.Document & {
  displayName: String
  username: String
  password: String
  email: String
  accountType: String
  accountId: String
  updateDisplayName: Function
  avatarsUrl: String
  profile: String
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
  },
  avatarsUrl: {
    type: String
  },
  profile: {
    type: String
  }
}, { timestamps: true })

declare module "express" {
  export interface Request {
    user: UserDocument
  }
}


export class UserModel extends modelHelper {
  /**
 * 檢查 user 是否存在
 * @param {string} userId
 * @returns {boolean} isExisted // false if not exist
 */
  static async checkUserExisted(userId: string): Promise<boolean> {
    let isExisted: boolean = false;
    let user = await User.findById(userId);
    if (user) {
      isExisted = true
    }
    return isExisted;
  }

  /**
   * 取得 user by user id
   * @param userId 
   * @returns {UserDocument} user
   */
  static async getUserById(userId: string): Promise<UserDocument> {
    let user: UserDocument = await User.findById(userId);
    if (user) {
      return user
    } else {
      return null
    }
  }

  /**
   * 更新 user email
   * @param {string} userId 
   * @param {string} email 
   */
  static async updateEmail(userId: string, email: string): Promise<boolean> {
    return new Promise(function (resolve, reject) {
      const userObjectId: ObjectID = new ObjectID(userId);
      const updateQuery = {
        $set: {
          email: email
        }
      }

      User.updateOne({ _id: userObjectId }, updateQuery, function (err) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
    })
  }

  /**
   * 更新 displayName
   * @param userId 
   * @param newName 
   * @returns boolean
   */
  static async updateDisplayName(userId: string, newName: string): Promise<boolean> {
    return new Promise(function (resolve, reject) {
      const userObjectId: ObjectID = new ObjectID(userId);
      const updateQuery = {
        $set: {
          displayName: newName
        }
      }
      User.updateOne({ _id: userObjectId }, updateQuery, function (err, status) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
    })
  }

  /**
   * 更新自我介紹
   * @param userId 
   * @param newProfile 
   */
  static async updateProfile(userId: string, newProfile: string) {
    return new Promise(function (resolve, reject) {
      const userObjectId: ObjectID = new ObjectID(userId);
      const updateQuery = {
        $set: {
          profile: newProfile
        }
      }
      User.updateOne({ _id: userObjectId }, updateQuery, function (err, status) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
    })
  }

  /**
   * 更新大頭貼
   * @param userId 
   * @param newAvatarsUrl 
   */
  static async updateAvatarsUrl(userId: string, newAvatarsUrl: string) {
    return new Promise(function (resolve, reject) {
      const userObjectId: ObjectID = new ObjectID(userId);
      const updateQuery = {
        $set: {
          avatarsUrl: newAvatarsUrl
        }
      }
      User.updateOne({ _id: userObjectId }, updateQuery, function (err, status) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
    })
  }
}
export const User = mongoose.model<UserDocument>("User", userSchema);
