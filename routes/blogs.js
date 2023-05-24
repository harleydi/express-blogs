const express = require('express');
const { v4: uuid } = require("uuid")
const app = require('../app');
const router = express.Router()

const blogs = [
    {
        id: "12627a33-a9fa-4ed6-86cf-65a5690a56ff",
        title: 'Introduction to JavaScript',
        description: 'Learn the basics of JavaScript programming language.',
        author: 'Michael Johnson',
        createdAt: '2023-05-22T19:16:00.821Z',
        lastModified: '2023-05-22T19:16:00.821Z'
      },
      {
        id: uuid(),
        title: 'Mastering React Framework',
        description: 'Become proficient in building web applications using React.',
        author: 'Jane Smith',
        createdAt: '2023-05-22T19:16:00.821Z',
        lastModified: '2023-05-22T19:16:00.821Z'
      },
      {
        id: uuid(),
        title: 'Deep Dive into Node.js',
        description: 'Explore the advanced concepts of Node.js and server-side development.',
        author: 'Michael Johnson',
        createdAt: '2023-05-22T19:16:00.821Z',
        lastModified: '2023-05-22T19:16:00.821Z'
      },
      {
        id: uuid(),
        title: 'CSS Tricks for Web Designers',
        description: 'Discover useful CSS techniques to enhance your web designs.',
        author: 'Emily Davis',
        createdAt: '2023-05-22T19:16:00.821Z',
        lastModified: '2023-05-22T19:16:00.821Z'
      },
      {
        id: uuid(),
        title: 'Effective Database Management',
        description: 'Learn best practices for managing databases and optimizing performance.',
        author: 'Robert Johnson',
        createdAt: '2023-05-22T19:16:00.821Z',
        lastModified: '2023-05-22T19:16:00.821Z'
      } 
  ];


router.get('/', (req, res) => {
    res.json({ message: 'hello from blog route' })
})

// get route that gets all blogs

router.get('/all', (req, res) => {
    
    res.status(200).json({ data: blogs })
})

// GET one blog by ID

router.get('/blog/:id', (req, res) => {
    const id = req.params.id
    const findBlog = blogs.findIndex((blog) => blog.id.toString() === id)
    if (findBlog === -1) {
        return res.status(400).json({ message: "Blog not found" })
    }
    const blog = blogs[findBlog]

    res.status(200).json({ data: blog })
})


// GET blogs by author

router.get('/author/:authorName', (req, res) => {
    const author = req.params.authorName
    const findByAuthor = blogs.filter(blog => blog.author.toLowerCase() === author.toLowerCase())

    

    res.status(200).json({ message: "success", data: findByAuthor })
})



//delete route that deletes one by id using req.params

router.delete('/delete/:id', (req, res) => {
    let id = req.params.id
    const blogIndex = blogs.findIndex((blog) => blog.id === id)
    if (blogIndex === -1) {
        res.status(400).json({ success: false, message: 'blog not found' })
    }
    console.log(blogIndex)

    blogs.splice(blogIndex, 1)

    res.status(200).json({ message: 'deleted succesfully' })
})

// post route that creates a new blog

router.post('/new', (req, res) => {
    console.log(blogs.length)
    let id = uuid()
    const errArr = []

    const newBlog = {
      id: id,
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }
    if (errArr > 0) {
        return res.status(400).json({ success: false, messag: errArr })
    }
    blogs.push(newBlog)
    res.status(200).json({ message: "Blog created" })
})

// update blog

router.put('/update/:id', (req, res) => {
    const { title, description, author } = req.body
    
    const id = req.params.id

    const getBlogId = blogs.findIndex((blog) => blog.id === id)

    const blog = blogs[getBlogId]
    
    if (getBlogId === -1) {
        const auth = author ? blog.author = author : blog.author
        const desc = description ? blog.description = description : blog.description
        const title2 = title ? blog.title = title : blog.title 
    } else {
        return res.status(400).json({ success: false, message: "Blog not found" })
    }
      
    
    res.status(200).json({ message: 'Blog updated' })
})

module.exports = router