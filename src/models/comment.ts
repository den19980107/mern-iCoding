import mongoose, { Document, Model } from "mongoose";
import { modelHelper } from "./modelHelper";


export type CommentDocument = mongoose.Document & {
   userId: string,
   belongId: string,
   body: string,
   createdAt: Date,
   updatedAt: Date
};

let commentSchema = new mongoose.Schema({
   userId: {
      type: String,
      require: true
   },
   belongId: {
      type: String,
      require: true
   },
   body: {
      type: Array,
      require: true
   }
}, { timestamps: true })

export class CommentModel extends modelHelper {

   /**
    * belongId 就是假如是在影片底下留言就是影片 id 如果是在教材底下留言 就是教材id 以此類推
    * @param belongId 
    */
   static async getComments(belongId: string): Promise<Array<CommentDocument>> {
      let comments = await Comment.find({ belongId: belongId });
      return comments
   }

   /**
    * 建立留言
    * @param comment 
    */
   static async createComments(comment: CommentDocument): Promise<boolean> {
      let newComment = new Comment(comment)
      return new Promise(function (resolve, reject) {
         newComment.save(function (err, comment) {
            if (err) {
               resolve(false)
            } else {
               resolve(true)
            }
         });
      })
   }

   /**
    * 刪除留言
    * @param commentId 
    * @param userId 
    */
   static async deleteComments(commentId: string, userId: string): Promise<boolean> {
      let comment = await Comment.findById(commentId)
      if (comment.userId == userId) {
         let result = await this.deleteById(commentId, Comment)
         return result;
      } else {
         console.log("userId 跟留言的留言者 id 不同所以無法刪除")
         return false;
      }
   }
}

export const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);
