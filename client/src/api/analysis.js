import axios from 'axios'
import { _get, _post } from './common';
const uploadVideoActions = async (videoId, userId, actions) => {
    const url = "/api/analysis/uploadVideoActions"
    let res = await _post(url, {
        videoId: videoId,
        userId: userId,
        actions: actions
    }, "api uploadVideoActions error")
    return res
}


export default {
    uploadVideoActions
}