import { doc, getDoc, getDocs, setDoc, collection } from "firebase/firestore";
import { db } from "../config";

export const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData, { merge: true });
    console.log("User added:", userId);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const getUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("User data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const addPost = async (postId, post) => {
  try {
    await setDoc(doc(db, "posts", postId), post, { merge: true });
    console.log("Post added:", postId);
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

export const getPosts = async (id) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Post data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const fetchAllPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const addCommentToDB = async (postId, comment) => {
  try {
    await updateDoc(doc(db, "posts", postId), {
      comments: arrayUnion(comment),
    });

    console.log("Comment added!");
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};
