import Post from "@/Components/Post";
import AddPost from "./AddPost";

const Posts = ({ posts, toast }) => {
  return (
    <div className="w-[700px] mx-auto p-5">
      <AddPost toast={toast} />
      {posts.map(post => <Post key={post.id} post={post} toast={toast} />)}
    </div>
  )
}

export default Posts
