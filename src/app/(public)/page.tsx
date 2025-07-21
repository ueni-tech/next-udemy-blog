import { getPosts, searchPosts } from "@/lib/post"
import PostCard from "@/components/post/PostCard"
import { Post } from '@/types/post'

type Props = {
  search? : string
}

export default async function PostsPage(
  // クエリパラメータの受け取り
  {searchParams}: {searchParams: Promise<Props>}
) {
  // クエリパラメータの取得
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.search || '';

  // クエリパラメータを用いて記事の取得
  const posts = query ? await searchPosts(query) as Post[] : await getPosts() as Post[]

  return (
    <>
    <div className="container mx-auto px-4 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
    </>
  )
}
