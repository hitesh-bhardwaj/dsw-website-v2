import { headers } from "next/headers";
import PricingTable from "./PricingTable";

export default async function PricingTableWrapper({ searchParams }) {
  const headersList = await headers();

  const country = headersList.get("x-vercel-ip-country") || "IN";

  let region = country === "IN" ? "IN" : "US";

  // Override for testing: only allow IN or US
  if (searchParams?.region) {
    const testRegion = searchParams.region.toUpperCase();

    if (["IN", "US"].includes(testRegion)) {
      region = testRegion;
    }
  }

  return <PricingTable region={region} />;
}