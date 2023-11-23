export enum Category {
  ABOUT = "ABOUT",
  TIPS = "TIPS",
  RECRUITMENT = "RECRUITMENT",
}

export enum CategoryConvertText {
  ABOUT = "Về Lavor",
  TIPS = "Kiến thức & mẹo",
  RECRUITMENT = "Tuyển dụng",
}

export enum Status {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  DELETED = "DELETED",
}

export enum PStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
}

export interface IBlog {
  blog_id: number;

  blog_title: string;

  blog_content: string;

  blog_image_url: string;

  blog_description: string;

  blog_category: Category;

  blog_upload_date: Date;

  blog_status: Status;
  blog_url?: string;
}

export interface IProductVariant {
  variant_color: string;

  image_url: string;
}

export interface IProductDetail {
  name: string;
  value: string;
}

export interface IProduct {
  product_id: number;
  product_type: ProductType;

  product_name: string;

  product_price: number;

  product_detail: IProductDetail[];

  product_feature: string;

  product_description: string;

  product_meta: string;

  product_upload_date: Date;

  product_status: Status;

  product_images: string[];

  variants: IProductVariant[];
}

// export interface IBlog {
//   year: number;
// }

export interface IYear {
  year: number;
}

export interface IBrand {
  brand_id: number;
  brand_name: string;
  models: IModel[];
}

export interface IModel {
  model_id: number;
  model_name: string;
  versions: IVersion[];
}

export interface IVersion {
  version_id: number;
  version_name: string;
}

export interface IProductDetail {
  name: string;
  value: string;
}

export interface IProductColor {
  variant_color: string;
  image_url: any;
}

export enum ProductType {
  OTHER = "OTHER",
  CHAIR = "CHAIR",
  STEERING_WHEEL = "STEERING_WHEEL",
  PILLOW = "PILLOW",
  FLOOR = "FLOOR",
}

export enum ProductTypeToText {
  OTHER = "Sản phẩm khác",
  CHAIR = "Bọc ghế da",
  STEERING_WHEEL = "Bọc tay lái",
  PILLOW = "Gối cổ",
  FLOOR = "Thảm lót sàn",
}

export enum SlugToType {
  "goi-co" = "PILLOW",
  "tham-lot-san" = "FLOOR",
  "boc-tay-lai" = "STEERING_WHEEL",
  "boc-ghe" = "CHAIR",
  "san-pham-khac" = "OTHER",
}

export enum SlugToTitle {
  "goi-co" = "Gối cổ",
  "tham-lot-san" = "Thảm lót sàn",
  "boc-tay-lai" = "Bọc tay lái",
  "boc-ghe" = "Bọc ghế da",
  "san-pham-khac" = "Sản phẩm khác",
}

export interface IPagination {
  total: number;
  page: string;
  limit: string;
}
