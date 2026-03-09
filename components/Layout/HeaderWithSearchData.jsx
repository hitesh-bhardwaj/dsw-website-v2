import { getAllPosts } from "@/lib/posts";
import { getAllNews } from "@/lib/news";
import HeaderNew from "./HeaderNew";

export default async function HeaderWithSearchData() {
//   const [{ posts }, { news }] = await Promise.all([
//     getAllPosts(),
//     getAllNews(),
//   ]);

  return <HeaderNew blogs={posts || []} news={news || []} />;
}