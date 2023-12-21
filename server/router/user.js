const express = require("express");
const router = express.Router();

const { User } = require("../model/User.js");
const { Counter } = require("../model/Counter.js");

// 이미지 업로드
const setUpload = require("../util/upload.js");

// 회원 가입
router.post("/join", (req, res) => {
    let temp = req.body;

    Counter.findOne({ name: "counter" })
        .then((result) => {
            temp.userNum = result.userNum;

            const userData = new User(temp);
            userData.save().then(() => {
                Counter.updateOne({ name: "counter" }, { $inc: { userNum: 1 } }).then(() => {
                    res.status(200).json({ success: true })
                })
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
});

// 닉네임 중복 검사
router.post("/namecheck", (req, res) => {
    User.findOne({ displayName: req.body.displayName })
        .exec()
        .then((result) => {
            let check = true;
            if (result) {
                check = false;
            }
            res.status(200).json({ success: true, check })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
})

// 프로필 사진(네이버 클라우드에 업로드 되는 것 몽고디비에는 변경 X)
router.post("/profile/img", setUpload("react-blog05/user"), (req, res, next) => {
    // console.log(res.req);
    res.status(200).json({ success: true, filePath: res.req.file.location })
})

// 프로필 사진(몽고디비 photoURL이 변경된 사진의 url로 변경)  => 네이버 클라우드와 몽고디비 photoURL이 같음
router.post("/profile/update", (req, res) => {
    let temp = {
        photoURL: req.body.photoURL,
    }

    User.updateOne({ uid: req.body.uid }, { $set: temp })
        .exec()
        .then(() => {
            res.status(200).json({ success: true })
        })
        .catch((err) => {
            res.status(400).json({ success: false })
        })
})


module.exports = router;