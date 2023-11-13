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
