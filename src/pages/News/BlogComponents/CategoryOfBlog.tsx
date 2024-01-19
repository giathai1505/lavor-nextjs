import { BLOG_CATEGORY_COLOR } from "@/constants/constants";
import { Category, CategoryConvertText } from "@/types/type";

type TBlogCategoryBlog = {
  CategoryId: Category;
};

const CategoryOfBlog = ({ CategoryId }: TBlogCategoryBlog) => {
  const className = `py-[6px] px-2 rounded-sm text-white w-fit text-xs bg-${BLOG_CATEGORY_COLOR[CategoryId]}`;
  return <div className={className}>{CategoryConvertText[CategoryId]}</div>;
};

export default CategoryOfBlog;
