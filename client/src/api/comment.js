import axios from 'axios'
import { _get, _post } from './common';

const createComment = async (userId, body, belongId) => {
   const url = "/api/comment/create";
   console.log(userId, body, belongId)
   let res = await _post(url, {
      userId,
      body,
      belongId
   }, "api createComment error")
   return res
}

const getVideoComment = async (belongId) => {
   const url = `/api/comment/video/${belongId}`;
   let res = await _get(url, "api getVideoComment error")
   return res
}

const getMaterialComment = async (belongId) => {
   const url = `/api/comment/material/${belongId}`;
   let res = await _get(url, "api getMaterialComment error")
   return res
}

const getTestComment = async (belongId) => {
   const url = `/api/comment/test/${belongId}`;
   let res = await _get(url, "api getTestComment error")
   return res
}

const getCommentByUrl = async (url) => {
   let res = await _get(url, "api getCommentByUrl error")
   return res
}

export default {
   createComment,
   getMaterialComment,
   getVideoComment,
   getTestComment,
   getCommentByUrl
}