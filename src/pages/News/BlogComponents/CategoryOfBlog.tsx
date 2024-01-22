import { BLOG_CATEGORY_COLOR } from "@/constants/constants";
import { Category, CategoryConvertText } from "@/types/type";

type TBlogCategoryBlog = {
  CategoryId: Category;
};

const CategoryOfBlog = ({ CategoryId }: TBlogCategoryBlog) => {
  const className = "py-[6px] px-2 rounded-sm text-white w-fit text-xs";
  return (
    <div
      className={className}
      style={{ backgroundColor: `${BLOG_CATEGORY_COLOR[CategoryId]}` }}
    >
      {CategoryConvertText[CategoryId]}
    </div>
  );
};

export default CategoryOfBlog;
