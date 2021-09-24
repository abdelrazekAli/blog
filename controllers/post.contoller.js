const getStream = require("into-stream");
const postModel = require("../models/post.model");
const ObjectId = require("mongoose").Types.ObjectId;
const { checkId } = require("../models/user.model");
const azureUpload = require("../utils/azure.upload");
const { postValidation, checkImgFromat } = require("../utils/validation");

exports.getPosts = async (req, res) => {
  try {
    let posts,
      { userId } = req.query;

    if (!userId) {
      posts = await postModel.getAllPosts();
    } else {
      // Check user id
      let checkResult = await checkId(userId);
      if (checkResult) return res.status(400).send(checkResult);

      posts = await postModel.getUserPosts(userId);
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send("Faild to get posts");
    console.log(err);
  }
};

exports.getPost = async (req, res) => {
  try {
    let postId = req.params.id;
    let checkResult = await postModel.checkId(postId);
    if (checkResult) return res.status(400).send(checkResult);

    let post = await postModel.getPostDetails(postId);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).send("Faild to get post");
    console.log(err);
  }
};

exports.createNewPost = async (req, res) => {
  try {
    let createdBy = req.user._id;
    let { title, body } = req.body;

    if (!title || !body || !req.file) {
      return res.status(400).send("title, body, image are required");
    }

    // Check validation errors
    const validationResult = postValidation(req.body);
    if (validationResult) {
      return res.status(400).send(validationResult.details[0].message);
    }

    // Check image format
    let checkImg = checkImgFromat(req.file);
    if (!checkImg) {
      return res.status(400).send("Invalid image format");
    }

    // Check user id
    let checkResult = await checkId(createdBy);
    if (checkResult) return res.status(400).send(checkResult);

    // Upload post image to azure
    let blobName = azureUpload.getBlobName(req.file.originalname);
    let stream = getStream(req.file.buffer);

    // Create Container Client if not exist
    azureUpload.createContainerIfNotExist("postimgs");
    let containerClient =
      azureUpload.blobServiceClient.getContainerClient("postimgs");
    let blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Set buffer size to 4MB and max 20 buffers
    let uploadOptions = { bufferSize: 4 * 1024 * 1024, maxBuffers: 20 };
    await blockBlobClient.uploadStream(
      stream,
      uploadOptions.bufferSize,
      uploadOptions.maxBuffers,
      {
        blobHTTPHeaders: { blobContentType: "image/jpeg" },
      }
    );

    let post = await postModel.createNewPost(title, body, blobName, createdBy);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).send("Faild to create new post");
    console.log(err);
  }
};

exports.updatePost = async (req, res) => {
  try {
    let postImg,
      postId = req.params.id,
      userId = req.user._id,
      { title, body } = req.body;

    // Check post id
    let result = await postModel.checkId(postId);
    if (result) return res.status(400).send(result);

    // Get old post details
    let post = await postModel.getPostDetails(postId);

    if (ObjectId(post.createdBy._id).toString() === userId) {
      // Check validation errors
      const validationResult = postValidation(req.body);
      if (validationResult) {
        return res.status(400).send(validationResult.details[0].message);
      }

      // Check if image is exist to update
      if (req.file) {
        // Check image format
        let checkResult = checkImgFromat(req.file);
        if (!checkResult) {
          return res.status(400).send("Invalid image format");
        }

        // Upload image to azure
        postImg = azureUpload.getBlobName(req.file.originalname);
        let stream = getStream(req.file.buffer);
        let containerClient =
          azureUpload.blobServiceClient.getContainerClient("postimgs");
        let blockBlobClient = containerClient.getBlockBlobClient(postImg);

        // Set buffer size to 4MB and max 20 buffers
        let uploadOptions = { bufferSize: 4 * 1024 * 1024, maxBuffers: 20 };
        await blockBlobClient.uploadStream(
          stream,
          uploadOptions.bufferSize,
          uploadOptions.maxBuffers,
          {
            blobHTTPHeaders: { blobContentType: "image/jpeg" },
          }
        );

        // Delete old post image with its snapshots
        blockBlobClient = containerClient.getBlockBlobClient(post.postImg);
        blockBlobClient.delete({ deleteSnapshots: "include" });

        // Update post
        await postModel.updatePost(postId, title, body, postImg);
        res.status(200).send("Successfully updated post");
      } else {
        //  If no exist image to update
        await postModel.updatePost(postId, title, body, postImg);

        res.status(200).send("Successfully updated post");
      }
    } else return res.status(403).send("You can only update your posts");
  } catch (err) {
    res.status(500).send("Faild to update post");
    console.log(err);
  }
};

exports.deletePostById = async (req, res) => {
  try {
    // Check id
    let postId = req.params.id,
      userId = req.user._id;
    let checkResult = await postModel.checkId(postId);
    if (checkResult) return res.status(400).send(checkResult);

    // Get post details
    let postDetails = await postModel.getPostDetails(postId);
    if (ObjectId(postDetails.createdBy._id).toString() === userId) {
      // Delete post from database
      let post = await postModel.deletePostById(postId);

      //Delete post image from azure storage
      let containerClient =
        azureUpload.blobServiceClient.getContainerClient("postimgs");
      let blockBlobClient = containerClient.getBlockBlobClient(post.postImg);
      blockBlobClient.delete({ deleteSnapshots: "include" });

      res.status(200).send(`Successfully deleted post with id: ${postId}`);
    } else return res.status(403).send("You can only delete your posts");
  } catch (err) {
    res.status(500).send("Faild to delete post");
    console.log(err);
  }
};

// exports.deleteAllPosts = async (req, res) => {
//   try {
//     await postModel.deleteAllPosts();

//     //Delete storage container for post images from azure
//     await azureUpload.deleteContainerIfExist("postimgs");
//     res.status(200).send("Successfully deleted all posts");
//   } catch (err) {
//     res.status(500).send("Faild to delete posts");
//     console.log(err);
//   }
// };
