import { headers } from "next/headers";
import PricingTable from "./PricingTable";

export default async function PricingTableWrapper({ searchParams }) {
  const headersList = await headers();

  const country = headersList.get("x-vercel-ip-country") || "IN";

  let region = "IN";

  if (country === "US") region = "US";
  else if (["DE", "FR", "IT"].includes(country)) region = "EU";

  // 👇 OVERRIDE for testing
  if (searchParams?.region) {
    region = searchParams.region.toUpperCase();
  }

  return <PricingTable region={region} />;
}