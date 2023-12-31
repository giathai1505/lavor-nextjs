import CarManagementForm from "@/admin/CarManagement/CarManagementForm";
import { SERVER_API_ENPOINT } from "@/constants/server.env";
import { IBrand, IYear } from "@/types/type";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getAllYears() {
  const res = await fetch(SERVER_API_ENPOINT + "design/years", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

async function getAllBrands() {
  const res = await fetch(SERVER_API_ENPOINT + "design/brands", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

const page = async () => {
  const data = await getServerSession();

  if (!data?.user) {
    redirect("/admin/login");
  }

  const yearRes = await getAllYears();

  const years: IYear[] = yearRes ? yearRes : [];
  const brandRes = await getAllBrands();

  const brands: IBrand[] = brandRes ? brandRes : [];

  return <CarManagementForm years={years} brands={brands} />;
};

export default page;
