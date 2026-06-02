
import { headers } from "next/headers";
import PricingTable from "./PricingTable";

export default async function PricingTableWrapper({ searchParams }) {
  const headersList = await headers();

  const country =
    headersList.get("x-vercel-ip-country") ||
    headersList.get("cf-ipcountry") ||
    "";

  console.log("Country:", country);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          background: "red",
          color: "white",
          padding: "10px",
          zIndex: 99999,
        }}
      >
        Country: {country}
      </div>

      <PricingTable region={country === "IN" ? "IN" : "US"} />
    </>
  );
}
