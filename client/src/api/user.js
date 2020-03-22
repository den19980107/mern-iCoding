import axios from 'axios'
import { _get, _post } from './common';

const getCurrentLoginUser = async () => {
    const url = "/api/user/getCurrentLoginUser";
    let res = await _get(url, "api getCurrentLoginUser error")
    return res
}
/**
 * 
 * @param {string} userId 
 * @param {string} displayName 
 */
const updateDisplayName = async (userId, displayName) => {
    const url = `/api/user/updateDisplayName/${userId}`;
    let res = await _post(url, { displayName: displayName }, "api updateDisplayName error")
    return res
}
/**
 * 
 * @param {string} userId 
 * @param {string} email 
 */
const updateEmail = async (userId, email) => {
    const url = `/api/user/updateEmail/${userId}`;
    let res = await _post(url, { email: email }, "api updateEmail error")
    return res
}
/**
 * 
 * @param {string} userId 
 * @param {string} profile 
 */
const updateProfile = async (userId, profile) => {
    const url = `/api/user/updateProfile/${userId}`;
    let res = await _post(url, { profile: profile }, "api updateProfile error")
    return res
}
/**
 * 
 * @param {string} userId 
 * @param {string} avatarsUrl 
 */
const updateAvatar = async (userId, avatarsUrl) => {
    const url = `/api/user/updateAvatar/${userId}`;
    let res = await _post(url, { avatarsUrl: avatarsUrl }, "api updateAvatar error")
    return res
}
/**
 * 
 * @param {string} userId 
 */
const getUserById = async (userId) => {
    const url = `/api/user/${userId}`;
    let res = await _get(url, "api getUserById error");
    const user = res.user
    return user
}
/**
 * 
 * @param {string} userId 
 */
const getUserPublicInfoById = async (userId) => {
    const url = `/api/user/info/${userId}`;
    let res = await _get(url, "api getUserPublicInfoById error")
    return res
}
/**
 * 
 * @param {string} userId 
 */
const getUserStudyClasses = async (userId) => {
    const url = `/api/user/myStudyClass/${userId}`;
    let res = await _get(url, "api getUserStudyClasses error")
    return res
}
/**
 * 
 * @param {string} userId 
 */
const getUserTeachClass = async (userId) => {
    const url = `/api/user/myClass/${userId}`;
    let res = await _get(url, "api getUserTeachClass error")
    return res
}

export default {
    getCurrentLoginUser,
    updateDisplayName,
    updateEmail,
    updateProfile,
    updateAvatar,
    getUserById,
    getUserPublicInfoById,
    getUserStudyClasses,
    getUserTeachClass
}