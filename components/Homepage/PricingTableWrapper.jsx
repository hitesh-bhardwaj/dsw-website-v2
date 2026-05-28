
import { headers } from "next/headers";
import PricingTable from "./PricingTable";

export default async function PricingTableWrapper({ searchParams }) {
  const headersList = await headers();

  // Detect visitor country from Vercel headers
  const country =
    headersList.get("x-vercel-ip-country") || "";

  /*
    Pricing Logic

    - India => INR Pricing
    - Every other country => USD Pricing
  */

  let region = country === "IN" ? "IN" : "US";

  // Optional manual override for testing
  // Example:
  // ?region=IN
  // ?region=US
  if (searchParams?.region) {
    const overrideRegion =
      searchParams.region.toUpperCase();

    if (["IN", "US"].includes(overrideRegion)) {
      region = overrideRegion;
    }
  }

  // Debugging (remove in production)
  console.log("Detected Country:", country);
  console.log("Selected Region:", region);

  return <PricingTable region={region} />;
}
