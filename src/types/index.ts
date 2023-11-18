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

export interface IProduct {
  product_id: number;
  product_type: ProductType;

  product_name: string;

  product_price: number;

  product_detail: string;

  product_feature: string;

  product_description: string;

  product_meta: string;

  product_upload_date: Date;

  product_status: Status;

  product_images: string[];

  variants: any;
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
  models: IModel;
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
