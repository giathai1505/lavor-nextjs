"use client";
import React, { useEffect, useRef, useState } from "react";
import { BsCamera, BsFillImageFill } from "react-icons/bs";
import { BiCategory, BiSolidSave } from "react-icons/bi";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Category, Status } from "@/types";
import { addBlogAPI, editBlogAPI } from "@/api/blog";
import { ToastContainer } from "react-toastify";
import { VscLayersActive } from "react-icons/vsc";
import FormError from "@/components/Common/FormError";
import { areObjectsEqual } from "@/utilities";
import ConfirmDialog from "@/components/Common/Dialog";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";

export interface IFormValue {
  blog_title: string;
  blog_description: string;
  blog_image_url: string;
  blog_content: string;
  blog_category: Category;
  blog_status: Status;
}

interface IAddNewBlog {
  isEdit: boolean;
  defaultValue: IFormValue;
  blogID?: string;
}

const AddNewBlog: React.FC<IAddNewBlog> = ({
  defaultValue,
  isEdit,
  blogID,
}) => {
  const [editorContent, setEditorContent] = useState<string>(() => {
    if (defaultValue.blog_content !== "") {
      return defaultValue.blog_content;
    } else {
      return "";
    }
  });
  const editorRef = useRef<any>();

  const router = useRouter();
  const [image, setImage] = useState<any>("");
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  const form = useForm<IFormValue>({
    defaultValues: defaultValue,
    mode: "all",
  });

  useEffect(() => {
    if (defaultValue.blog_image_url !== "") {
      setImage(defaultValue.blog_image_url);
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: IFormValue) => {
    if (isEdit) {
      const newData = {
        ...data,
        blog_content: editorContent,
        blog_image_url: image,
      };
      const isDataChange = !areObjectsEqual(defaultValue, newData);
      if (isDataChange && blogID) {
        editBlogAPI(newData, blogID);
      }
    } else {
      addBlogAPI({
        ...data,
        blog_content: editorContent,
        blog_image_url: image,
      });
    }
  };

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(URL.createObjectURL(event.target.files[0]));
      console.log(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSaveChange = () => {
    //lưu chỉnh sửa ở đây
  };

  const handleBackToListBlog = () => {
    router.push("/admin/dashboard/blog-management");
  };

  const onEditorChange = (a: any, editor: any) => {
    setEditorContent(a);
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <ConfirmDialog
        onOk={handleSaveChange}
        title="Đổi trạng thái của bài viết"
        open={showConfirmDialog}
        content="Bạn có chắc muốn đổi trạng thái của bài viết này không?"
        onClose={() => setShowConfirmDialog(false)}
        type="information"
      />
      <div>
        <div className="flex justify-between items-center bg-white mb-5 p-5">
          <p className="admin-title">
            {isEdit ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
          </p>
          <div className="flex items-center gap-2 flex-none">
            <button
              type="button"
              className="admin-button basic"
              onClick={handleBackToListBlog}
            >
              Quay lại danh sách
            </button>

            <button className="admin-button primary" type="submit">
              <BiSolidSave />
              <span> {isEdit ? "Lưu chỉnh sửa" : "Lưu bài viết"}</span>
            </button>
          </div>
        </div>

        <div className="form-part-wrapper">
          <p className="form-part-title">Thông tin cơ bản</p>
          <div className="form-content">
            <div className="form-control">
              <div className="form-control-title">
                <span>Tiều đề</span>
                <div>*</div>
              </div>

              <Controller
                name="blog_title"
                control={control}
                defaultValue=""
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Minimum length is 3 characters",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    onBlur={() => {
                      if (!field.value) {
                        field.onChange("");
                      }
                    }}
                    placeholder="Nhập tiêu đề bài viết"
                    className="admin-input"
                    id="text"
                  />
                )}
              />
              {errors.blog_title && (
                <FormError message={errors.blog_title.message} />
              )}
            </div>

            <div className="form-control">
              <div className="form-control-title">
                <span>Danh mục</span>
                <div>*</div>
              </div>
              <div className="form-control-body">
                <BiCategory />
                <Controller
                  name="blog_category"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <select {...field}>
                      <option value="">Select an option</option>
                      <option value={Category.ABOUT}>Về Lavor</option>
                      <option value={Category.TIPS}>Kiến thức & mẹo</option>
                      <option value={Category.RECRUITMENT}>Tuyển dụng</option>
                    </select>
                  )}
                />
              </div>
            </div>

            <div className="form-control">
              <div className="form-control-title">
                <span>Trạng thái</span>
                <div>*</div>
              </div>
              <div className="form-control-body">
                <VscLayersActive />
                <Controller
                  name="blog_status"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <select {...field}>
                      <option value={Status.ACTIVE}>Hoạt động</option>
                      <option value={Status.SUSPENDED}>Ngưng hoạt động</option>
                      <option value={Status.DELETED}>Thùng rác</option>
                    </select>
                  )}
                />
              </div>
            </div>

            <div className="form-control">
              <div className="form-control-title">
                <span>Description</span>
                <div>*</div>
              </div>

              <Controller
                name="blog_description"
                control={control}
                defaultValue=""
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Minimum length is 3 characters",
                  },
                }}
                render={({ field }) => (
                  <textarea
                    className="text-[13px]"
                    {...field}
                    rows={4}
                    placeholder="Nhập mô tả bài viết"
                  />
                )}
              />

              {errors.blog_description && (
                <FormError message={errors.blog_description.message} />
              )}
            </div>
          </div>
        </div>
        <div className="form-part-wrapper">
          <p className="form-part-title">Media</p>
          <div className="form-content">
            <div className="form-control">
              <div className="form-control-title">
                <span>Ảnh chỉnh</span>
                <div>*</div>
              </div>

              <Controller
                name="blog_image_url"
                control={control}
                defaultValue=""
                rules={{
                  required: "Image is required",
                }}
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      id="file"
                      onChange={(e) => {
                        loadFile(e);
                        return field.onChange(e.target.files);
                      }}
                      style={{ display: "none" }}
                    />
                    <div className="form-img-container">
                      <div className="w-full h-full flex justify-center items-center">
                        {image ? (
                          <img
                            src={image}
                            className="w-full h-full object-cover rounded-md"
                            id="output"
                            width="200"
                            alt="test"
                          />
                        ) : (
                          <div>
                            <BsFillImageFill className="empty-icon" />
                          </div>
                        )}
                      </div>

                      <div className="icon-wrapper">
                        <label htmlFor="file" style={{ cursor: "pointer" }}>
                          <BsCamera className="icon" />
                        </label>
                      </div>
                    </div>
                  </>
                )}
              />

              {errors.blog_image_url && (
                <FormError message={errors.blog_image_url.message} />
              )}
            </div>
          </div>
        </div>
        <div className="form-part-wrapper">
          <p className="form-part-title">Mô tả bài viết</p>

          <div className="form-content">
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={editorContent}
              onEditorChange={onEditorChange}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | emoticons| help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>
        </div>
        <DevTool control={control} />
      </div>
      <ToastContainer />
    </form>
  );
};

export default AddNewBlog;
