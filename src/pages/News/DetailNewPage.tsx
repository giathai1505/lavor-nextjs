import PartHeader from "@/components/Common/PartHeader";
import titleBackgroundImage from "@/assets/images/headerPart/6.webp";
import { IBlog } from "@/types/type";
import BlogSidebar from "./BlogSidebar";
import RelatedNews from "./RelatedNews";
import DetailNewContent from "./BlogComponents/DetailNewContent";

type TPageProps = {
  blog: IBlog;
  relatedBlogs: IBlog[];
  allBlogs: IBlog[];
};

const DetailNewPage = ({ blog, relatedBlogs, allBlogs }: TPageProps) => {

  return (
    <div>
      <PartHeader
        breadcrumb="Tin tức"
        title="Tin tức"
        backgroundImage={titleBackgroundImage}
      />
      <div className="bg-black p-5 md:p-10">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-10 wrapper">
          <div className="col-span-1 xl:col-span-3 flex flex-col gap-5">
            <DetailNewContent blog={blog} />
          </div>
          <div>
            <BlogSidebar blogs={allBlogs} />
          </div>
        </div>
      </div>
      <div className="bg-black">
        <div className="wrapper">
          <RelatedNews blogs={relatedBlogs} />
        </div>
      </div>
    </div>
  );
};

export default DetailNewPage;
