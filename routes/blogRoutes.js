// Create a new blog post (POST /posts)
app.post("/posts", async (req, res) => {
  const { title, content, category, tags } = req.body;
  if (!title || !content || !category) {
    return res
      .status(400)
      .json({ message: "Title, content, and category are required" });
  }

  try {
    const post = new Post({ title, content, category, tags });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all blog posts (GET /posts)
app.get("/posts", async (req, res) => {
  const { term } = req.query; // Optional search term
  const query = {};

  if (term) {
    // Wildcard search for title, content, or category
    query.$or = [
      { title: new RegExp(term, "i") },
      { content: new RegExp(term, "i") },
      { category: new RegExp(term, "i") },
    ];
  }

  try {
    const posts = await Post.find(query);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific blog post by ID (GET /posts/:id)
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a blog post by ID (PUT /posts/:id)
app.put("/posts/:id", async (req, res) => {
  const { title, content, category, tags } = req.body;
  if (!title || !content || !category) {
    return res
      .status(400)
      .json({ message: "Title, content, and category are required" });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        category,
        tags,
      },
      { new: true }
    );

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a blog post by ID (DELETE /posts/:id)
app.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
