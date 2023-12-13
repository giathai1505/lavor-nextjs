import RatingTablePage from "@/admin/RatingManagement/RatingTablePage";
import { API_ENPOINT } from "@/constants/api";
import { TRating } from "@/types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Quản lý reviews",
  description: "Quản lý reviews",
};

async function getAllRatings() {
  const res = await fetch(API_ENPOINT + "review?withDeleted=true", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const RatingAdmin = async () => {
  const data = await getServerSession();

  if (!data?.user) {
    redirect("/admin/auth/login");
  }
  const res = await getAllRatings();

  const ratings: TRating[] = res?.reviews ? res?.reviews : [];

  return <RatingTablePage ratings={ratings} />;
};

export default RatingAdmin;
