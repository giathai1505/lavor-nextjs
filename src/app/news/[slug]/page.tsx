import DetailNews from "@/pages/News/DetailNews";
import React from "react";

interface IPageProps {
  params: { slug: string };
}

const index: React.FC<IPageProps> = ({ params }) => {
  return <DetailNews content={params.slug} />;
};

export default index;
