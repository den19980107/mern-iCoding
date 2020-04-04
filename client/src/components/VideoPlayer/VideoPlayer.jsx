import React, { useState, useEffect, useContext } from 'react';
import uuid from 'uuid';
import UserProvider from '../../context/UserProvider';
import api from '../../api/index'
import './videoPlayer.css'

const actionNames = {
    start: "start",
    play: "play",
    pause: "pause",
    fastForward: "fastForward",
    revers: "revers",
    end: "end"
}

const VideoPlayer = ({ style, src }) => {
    const videoId = src.split("/")[src.split("/").length - 1]
    const user = useContext(UserProvider.context);
    const [watcherId, setWatcherId] = useState(null);
    const [videoDomId, setVideoDomId] = useState(`video-player-${uuid()}`);
    const [videoDuration, setVideoDuration] = useState(0);
    const [actions, setActions] = useState([]);

    if (!style) {
        style = {
            width: "480px",
            height: "360px"
        }
    }

    useEffect(() => {
        if (user) {
            setWatcherId(user._id)
        }
        setVideoHandler();

        // on unmount
        return () => {
            api.analysis.uploadVideoActions(videoId, user._id, actions)
        }
    }, [user])


    const setVideoHandler = () => {
        let video = document.getElementById(videoDomId);

        video.onloadedmetadata = (e) => {
            setVideoDuration(video.duration);
            addAction(actionNames.start, 0, 0, e.timeStamp / 1000)
        }

        video.onplay = (e) => {
            console.log("on play", video.currentTime, e.timeStamp / 1000)
            addAction(actionNames.play, video.currentTime, video.currentTime, e.timeStamp / 1000)
        }

        video.onpause = (e) => {
            console.log("on pause", video.currentTime, e.timeStamp / 1000)
            addAction(actionNames.pause, video.currentTime, video.currentTime, e.timeStamp / 1000)
        }

        video.onseeked = (e) => {
            console.log("onseeked", video.currentTime, e.timeStamp / 1000)
        }


        var previousTime = 0;
        var currentTime = 0;
        video.onseeking = (e) => {
            addAction(actionNames.pause, previousTime, currentTime, e.timeStamp / 1000)
        }

        video.ontimeupdate = (e) => {
            previousTime = currentTime;
            currentTime = video.currentTime;
        }
    }

    const addAction = (actionName, from, to, timeStamp) => {
        let newAction = new VideoAction(actionName, from, to, timeStamp);
        actions.push(newAction)
        const newActions = actions
        setActions(newActions);
    }

    return (
        <div>
            <video id={videoDomId} style={style} src={src} controls>
                <source></source>
            </video>
        </div>
    );
};

class VideoAction {
    constructor(actionName, from, to, timeStamp) {
        this.actionName = actionName;
        this.from = from;
        this.to = to;
        this.timeStamp = timeStamp
    }
}
export default VideoPlayer;