const express = require('express');
const Blog = require('../models/blog');
const user = require('../models/user');

const router = express.Router();

router.get('/', async (req, res)=> {
    // res.send('we are at blog index page');
    const allBlogs = await Blog.find();
    res.json(allBlogs);
});

router.get('/similar', (req, res)=> {
    res.send('we are at similar blog page');
});

router.post('/', (req, res)=> {
    const blog = new Blog({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        user: req.body.user
    });

    blog.save()
        .then(data => {
            //also use this approach
            // res.status(200).json(data);
            res.json(data);
        })
        .catch(err => {
            res.json({message : err});
        })
    //also use this technique using async in route initialization
    // try {
    //     const saveblog = await blog.save();
    //     res.json(saveblog);
    // } 
    // catch (err) {
    //     res.json({message: err})
    // }
});

//get specific blog from list of blogs
router.get('/:blogId', async (req, res) => {
    const fetchOneBlog = await Blog.findById(req.params.blogId).populate('user');
    res.json(fetchOneBlog);
    console.log(fetchOneBlog, 'fetch one')

})

//delete specific blog from list of blogs
router.delete('/:blogId', async (req, res) => {
    const deleteBlog = await Blog.remove({ _id : req.params.blogId});
    res.json(deleteBlog);
})

//update specific blog from list of blogs
router.patch('/:blogId', async (req, res) => {
    const updateBlog = await Blog.updateOne({ _id : req.params.blogId},
        { $set : {title: req.body.title}}
    );
    res.json(updateBlog);
})

module.exports = router;