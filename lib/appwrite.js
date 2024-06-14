import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "titay-app-mobile",
  projectId: "666754a9000b02807edf",
  databaseId: "666755df00177e478394",
  userCollectionId: "6667560c001ba812056f",
  videoCollectionId: "6667563400285e501f0d",
  storageId: "666757fe002ee4c9cadb",
  likeId: "666c7cfe002327c27990"
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await Signin(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function Signin(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signout() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get All Users Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Latest Posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get User Posts
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("creator", userId)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File View
export async function getFileView(fileId, type) {
  let fileUrl;
  try {
   if (type === "video") {
    fileUrl = storage.getFileView(
      config.storageId,
      fileId,  
    );
   } else if (type === "image") {
    fileUrl = storage.getFileView(
      config.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );
   } else {
      throw new Error("Invalid file type");
   }
   if (!fileUrl) throw Error;
   return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(file, type) {
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };
  try {
    const uploadFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );
 
    const fileUrl = await getFileView(uploadFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}



// Create Video Post
export async function createVideo(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"), 
    ]);
    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        video: videoUrl,
        thumbnail: thumbnailUrl,
        creator: form.userId,
        prompt: form.prompt,
      }
    );
    console.log(newPost);
    return newPost;
    
  } catch (error) {
    console.log('error', error)
    throw new Error(error);
    
  }
}

// Search Posts
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// save video
export async function getPost(title) {
  try {
    const savePost = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("title", title)] // Use the correct field name for the video title
    );
    console.log("savePost", savePost);
    return savePost.documents; // Assuming you want to return the first matching document
  } catch (error) {
    throw new Error(error);
  }
}

// like video
export async function likePost(like) {
  try {
    // Retrieve the document
    const document = await databases.createDocument(
      config.databaseId,
      config.likeId,
      ID.unique(),
      {
        like: like,
        videoId: like.videoId,
        users: like.userId,
      }
    );

    // Check if document exists
    if (!document) {
      throw new Error(`Document with ID ${like} not found`);
    }
    return document;
     
  } catch (error) {
    throw new Error(error.message);
  }
}

 