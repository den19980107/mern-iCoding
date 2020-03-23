import React from 'react';
// import component
import { Upload, Button, Icon, message, Slider } from 'antd'
import { Form } from 'react-bootstrap'
import { useState } from 'react';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import axios from 'axios';
import AvatarEditor from 'react-avatar-editor'

const SettingProfile = ({ user, updateUserInfo }) => {
    const [displayName, setDisplayName] = useState(user.displayName);
    const [isDisplayNameChange, setIsDisplayNameChange] = useState(false)
    const [avatarsUrl, setAvatarsUrl] = useState(user.avatarsUrl);
    const [isAvatartChange, setIsAvatarChange] = useState(false)
    const [profile, settingProfile] = useState(user.profile);
    const [isProfileChange, setIsProfileChange] = useState(false);
    const [imageEditor, setImageEditor] = useState(null);
    const [imageEditorScale, setImageEditorScale] = useState(10);

    const handleUploadNewAvatarImage = (imageUrl) => {
        setAvatarsUrl(imageUrl)
        setIsAvatarChange(true)
    }

    const handleChangeDisplayName = (e) => {
        setDisplayName(e.target.value)
        setIsDisplayNameChange(true)
    }

    const handleChangeProfile = (e) => {
        settingProfile(e.target.value)
        setIsProfileChange(true)
    }

    const handleSvaeData = async () => {
        if (isDisplayNameChange) {
            try {
                let res = await axios.post('/api/user/updateDisplayName/' + user._id, { displayName: displayName });
                if (res.request.status == 200) {
                    message.success("顯示名稱 " + res.data.message)
                }
            } catch (err) {
                err.response.data.errors.forEach(error => {
                    message.error("顯示名稱 " + error.msg)
                })
            }
        }

        if (isAvatartChange) {
            try {
                let res = await axios.post('/api/user/updateAvatar/' + user._id, { avatarsUrl: avatarsUrl });
                if (res.request.status == 200) {
                    message.success("大頭貼 " + res.data.message)
                }
            } catch (err) {
                err.response.data.errors.forEach(error => {
                    message.error("大頭貼 " + error.msg)
                })
            }
        }

        if (isProfileChange) {
            try {
                let res = await axios.post('/api/user/updateProfile/' + user._id, { profile: profile });
                if (res.request.status == 200) {
                    message.success("自我介紹 " + res.data.message)
                }
            } catch (err) {
                err.response.data.errors.forEach(error => {
                    message.error("自我介紹 " + error.msg)
                })
            }
        }
        updateUserInfo(user._id);

        // 重置
        setIsDisplayNameChange(false)
        setIsAvatarChange(false)
        setIsProfileChange(false)
    }

    const setImageEditorRef = (editor) => {
        setImageEditor(editor);
    }

    const onClickSave = async () => {
        if (imageEditor) {
            const b64Image = imageEditor.getImage().toDataURL();
            var u8Image = b64ToUint8Array(b64Image);

            var formData = new FormData();
            formData.append("image", new Blob([u8Image], { type: "image/jpg" }));
            const response = await axios({
                method: 'post',
                url: '/api/image/upload',
                data: formData,
                headers: {
                    'content-type': `multipart/form-data; boundary=${formData._boundary}`,
                },
            });
            console.log(response.data.imageUrl)
            handleUploadNewAvatarImage(response.data.imageUrl)
        }
    }
    function b64ToUint8Array(b64Image) {
        var img = atob(b64Image.split(',')[1]);
        var img_buffer = [];
        var i = 0;
        while (i < img.length) {
            img_buffer.push(img.charCodeAt(i));
            i++;
        }
        return new Uint8Array(img_buffer);
    }
    return (
        <div style={{ marginBottom: "1rem" }}>
            <Form.Label>大頭貼</Form.Label>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <div style={{ height: "15rem", width: "15rem", position: "relative", display: "flex", justifyContent: "center", flexDirection: "column", overflow: "hidden", background: "black" }}>
                        {/* <img src={avatarsUrl || user.avatarsUrl} style={{ width: "100%" }}></img> */}
                        <AvatarEditor
                            ref={setImageEditorRef}
                            style={{ width: "100%", height: "100%" }}
                            image={avatarsUrl}
                            border={0}
                            borderRadius={100}
                            color={[255, 255, 255, 0.6]} // RGBA
                            scale={100 / (100 - imageEditorScale)}
                            rotate={0}
                            crossOrigin="anonymous"
                        />
                        <ImageUploader onChange={handleUploadNewAvatarImage} style={{ fontSize: "10px", position: "absolute", top: 0, right: 0 }}></ImageUploader>
                    </div>
                    <div style={{ display: "flex" }} >
                        <Slider style={{ flex: 2 }} value={imageEditorScale} onChange={(scale) => setImageEditorScale(scale)} />
                        <Button onClick={onClickSave}>確定</Button>
                    </div>
                </div>
            </div>

            <Form>
                <Form.Group>
                    <Form.Label>顯示名稱</Form.Label>
                    <Form.Control type="text" value={displayName || user.displayName} onChange={handleChangeDisplayName} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>帳號</Form.Label>
                    <Form.Control type="text" value={user.username} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>自我介紹</Form.Label>
                    <Form.Control type="text" as="textarea" rows="5" value={profile || user.profile} onChange={handleChangeProfile} />
                </Form.Group>
            </Form>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="primary" onClick={handleSvaeData}>儲存</Button>
            </div>
        </div>
    );
};

export default SettingProfile;