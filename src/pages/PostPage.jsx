import PostList from "../components/PostList";
import { Link } from "react-router-dom";


export default function PostPage({groupsId}) {

  return(
        <>
        <PostList id={groupsId} />

        <Link>
          <h2> Groups </h2>
        </Link>
        </>
  )
};