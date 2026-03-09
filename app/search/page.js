import Layout from "@/components/Layout/Layout";
import SearchPageClient from "@/components/Layout/Search/SearchPageClient";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = typeof params?.q === "string" ? params.q : "";

  return (
    <Layout>
      <SearchPageClient initialQuery={query} />;
    </Layout>
  );
}
