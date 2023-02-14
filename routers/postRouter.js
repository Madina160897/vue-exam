const express = require("express");
const { NewPostModel } = require("../Models");
const router = express.Router();

router.get("/", (req, res) => {
    NewPostModel.find({}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    NewPostModel.find(id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

router.post("/", async (req, res) => {
    const { email, title, post, img } = req.body;

    const newPost = new NewPostModel({ email, title, post, img,  like: 0 });
    newPost.save((err) =>{ 
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send("Добавлен новый пост");
        }
    });
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { title, post, img } = req.body;
    await NewPostModel.findByIdAndUpdate(id, { title, post, img });
    res.send("Изменен")
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    NewPostModel.findByIdAndDelete(id, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send("Удален");
        }
    });
});

router.get("/like/:id", async (req, res) => {
    const postId = req.params.id
    const post = await NewPostModel.findById(postId);
    await NewPostModel.findByIdAndUpdate(postId,{like: post.like + 1 })
    res.status(201).send("Нравится");
});

router.get("/unlike/:id", async (req, res) => {
    const postId = req.params.id
    const post = await NewPostModel.findById(postId);
    await NewPostModel.findByIdAndUpdate(postId,{like: post.like - 1})
    res.status(201).send("Не нравится");
});

module.exports = router