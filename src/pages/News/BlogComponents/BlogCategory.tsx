import { Category, CategoryConvertText, IBlog } from "@/types/type";
import React from "react";

const calculateNumBlogOfCategory = (blogs: IBlog[]) => {
  return blogs.reduce((result, item) => {
    if (result.has(item.blog_category)) {
      const oldValue = result.get(item.blog_category) || 0;
      result.set(item.blog_category, oldValue + 1);
    } else {
      result.set(item.blog_category, 1);
    }

    return result;
  }, new Map<string, number>());
};

interface IBlogCategoryProps {
  blogs: IBlog[];
}

const BlogCategory: React.FC<IBlogCategoryProps> = ({ blogs }) => {
  if (!blogs) return;
  const categories = calculateNumBlogOfCategory(blogs);

  return (
    <div className="category-container">
      <p className="font-bold text-lg mb-4">Danh mục</p>
      <div className="border border-solid border-[#8080805e] mb-5 p-5 pl-10">
        <ul>
          {(Object.keys(Category) as Category[]).map((item) => {
            return (
              <li key={item}>
                <div className="flex justify-between">
                  <span>{CategoryConvertText[item]}</span>
                  <span>
                    ({categories.has(item) ? categories.get(item) : 0})
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BlogCategory;
