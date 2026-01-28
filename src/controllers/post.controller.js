import postService from "../services/posts.service.js";

class PostController {
  async POST(req, res) {
    try {
      const { title, content, userId } = req.body;
      if (!title || !content || !userId) {
        return res.status(400).json({
          success: false,
          message: "Title, content, and userId are required",
        });
      }
      const data = await postService.POST(req.body);
      res.status(201).json({
        success: true,
        message: "Post created successfully",
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async GET(req, res) {
    try {
      const data = await postService.GET();
      res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  async GETONE(req, res) {
    try {
      const data = await postService.GETONE(req.params.id);
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async PUT(req, res) {
    try {
      const data = await postService.PUT(req.params.id, req.body);
      if (data.matchedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async DEL(req, res) {
    try {
      const data = await postService.DEL(req.params.id);
      if (data.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Post deleted successfully",
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new PostController();
