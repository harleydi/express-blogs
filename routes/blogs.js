const express = require('express');
const app = require('../app');
const router = express.Router()

const blogs = [
    {
      id: 1,
      title: "Blog 1",
      description: "Description of Blog 1",
      author: "John Doe",
      createdAt: '2023-05-22T19:16:00.821Z',
      lastModified:'2023-05-22T19:16:00.821Z'
    },
    {
      id: 2,
      title: "Blog 2",
      description: "Description of Blog 2",
      author: "Jane Smith",
      createdAt:'2023-05-22T19:16:00.821Z',
      lastModified: '2023-05-22T19:16:00.821Z'
    },
    {
      id: 3,
      title: "Blog 3",
      description: "Description of Blog 3",
      author: "Alex Johnson",
      createdAt: '2023-05-22T19:16:00.821Z',
      lastModified: '2023-05-22T19:16:00.821Z'
    },
    {
      id: 4,
      title: "Blog 4",
      description: "Description of Blog 4",
      author: "Emily Davis",
      createdAt: '2023-05-22T19:16:00.821Z',
      lastModified: '2023-05-22T19:16:00.821Z'
    },
    {
      id: 5,
      title: "Blog 5",
      description: "Description of Blog 5",
      author: "Michael Brown",
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
    let id = blogs.length + 1

    const newBlog = {
      id: id,
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      createdAt: new Date(),
      lastModified: new Date()
    }

    blogs.push(newBlog)
    res.status(200).json({ message: "Blog created" })
})

router.put('/update/:id', (req, res) => {
    const id = req.params.id
    const findById = blogs.findIndex((blog) => blog.id.toString() === id)

    const blog = blogs[findById] 
    console.log(blog)
    // const updatedBlog = { ...blog }

    for(let key in req.body) {
        if (req.body[key]) {
            blog[key] = req.body[key]
        }
    }

    

    res.status(200).json({ message: 'Blog updated' })
})

module.exports = router