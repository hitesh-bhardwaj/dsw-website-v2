
import { headers } from "next/headers";
import PricingTable from "./PricingTable";

export default async function PricingTableWrapper({ searchParams }) {
  const headersList = await headers();

  const country =
    headersList.get("x-vercel-ip-country") ||
    headersList.get("cf-ipcountry") ||
    "";

return <PricingTable region={country === "IN" ? "IN" : "US"} />;
}
