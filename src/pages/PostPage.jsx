import PostList from "../components/PostList";


export default function PostPage({groupsId}) {

  return(
        <>
        <PostList id={groupsId} />
        </>
  )
};