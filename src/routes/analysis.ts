import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import { VideoActionRecord, VideoActionRecordModel, VideoActionRecordDocument } from '../models/videoActionRecord';

const router = express.Router();

// TODO:接收前端影片傳上來的影片行為
router.post('/uploadVideoActions', async (req, res) => {
    const { actions, userId, videoId } = req.body;
    if (actions && actions.length != 0 && userId && videoId) {
        for (let i = 0; i < actions.length; i++) {
            const action = actions[i];

            let actionRecord: VideoActionRecordDocument = new VideoActionRecord({
                actionName: action.actionName,
                from: action.from,
                to: action.to,
                timeStamp: action.timeStamp,
                userId: userId,
                videoId: videoId
            })

            let isSuccess = await VideoActionRecordModel.createVideoActionRecord(actionRecord);
            if (isSuccess) {
                res.status(200)
            } else {
                res.status(500)
            }
        }
    }
})


export = router;
