/* eslint-disable no-undef */
import Blog from '../models/blog';

// get list of all blogs from db
exports.blog_get = async (req, res) => {
    try {
        const allBlogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ allBlogs });
    }
    catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
};

// get a single blog from db
exports.blog_getOne = async (req, res) => {
    try {
        const id = req.params.id;
        
        const singleBlog = await Blog.findById(id);
        res.status(200).json({ singleBlog });
    }
    catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
};

// add a blog to the db
exports.blog_post = async (req, res) => {
    try {
        const { _id, name } = req.user;
    
        const { title, content } = req.body;

        const blog = await Blog.findOne({ title });
        
        if (blog) return res.status(400).json(`Blog already exist.`)
        
        const newBlog = new Blog({
            title,
            author: { _id, name },
            content
        });
        const addedBlog = await Blog.create(newBlog);

        return res.status(201).json({ message: 'Blog is added', addedBlog });
    }
    catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
};

// update a blog in the db
exports.blog_update = async (req, res) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const blog = await Blog.findByIdAndUpdate({ _id: req.params.id }, req.body);
        const updatedBlog = await Blog.findOne({ _id: req.params.id });
        res.status(200).send(updatedBlog);
    }
    catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
};

// delete a blog from the db
exports.blog_delete = async (req, res) => {
    let { id } = req.params;
    
    try {
        const existBlog = await Blog.find({ _id: id });
        
        if (existBlog.length) {
        
            try {
                // eslint-disable-next-line no-unused-vars
                const deletedBlog = await Blog.deleteOne({ _id: id });
                res.status(200).send(`Blog is deleted ${existBlog}`);
            }
            catch (error) {
                throw new Error(error);
            }
        }
        else {
            res.status(404).json({ status: 403, error: 'Blog Id does not exist' });
        }
    }
    catch (error) {
        res.status(500).json({ status: 403, error: 'Invalid blog Id' });
    }
};