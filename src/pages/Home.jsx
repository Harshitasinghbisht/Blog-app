import React,{useEffect,useState} from "react";
import appwriteService from '../appwrite/config';
import { Container,PostCard } from "../component";


function Home() {
        
    const [posts,setPosts]=useState([])

    useEffect(()=>{
     appwriteService.getPosts().then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
     }).catch(error => {
        console.log("Home Component failed to load post:", error);
      })
    },[])
    
      if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500">
        <Container>
          <div className="flex flex-col items-center justify-center text-center py-24 px-6">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Welcome to DevBlog 🚀
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
              Share your stories, ideas, and experiences with the world. Login
              or sign up to start creating your own posts.
            </p>
            <a
              href="/login"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-slate-800 text-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300"
            >
              Login to Read Posts
            </a>
          </div>
        </Container>
      </div>
    );
  }

  // ✅ Posts available
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-r from-blue-600 to-slate-800 text-white shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-md">
          Explore Inspiring Blogs
        </h1>
        <p className="text-lg opacity-90">
          Read, learn, and share your voice with the community.
        </p>
      </div>

      {/* Posts Section */}
      <Container>
        <div className="flex flex-wrap justify-center py-10">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-4 w-full sm:w-1/2 lg:w-1/4 transition-transform transform hover:scale-105"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home