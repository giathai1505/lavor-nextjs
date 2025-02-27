import AgencyManagementTable from "@/admin/AgencyManagement/AgencyManagementTable";
import { SERVER_API_ENPOINT } from "@/constants/server.env";
import { IRegion } from "@/types/type";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Quản lý đại lý",
  description: "Quản lý đại lý",
};

async function getAllAgency() {
  const res = await fetch(SERVER_API_ENPOINT + "agencies", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async () => {
  const data = await getServerSession();

  if (!data?.user) {
    redirect("/admin/login");
  }
  const res = await getAllAgency();

  const regions: IRegion[] = res?.regions ? res?.regions : [];

  if (res?.regions) return <AgencyManagementTable agencies={regions} />;
};

export default page;
