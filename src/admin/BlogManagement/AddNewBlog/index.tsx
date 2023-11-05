"use client";
import React, { useEffect, useState } from "react";
import { ContentState, EditorState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { BsCamera, BsFillImageFill } from "react-icons/bs";
import { BiCategory, BiSolidSave } from "react-icons/bi";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Category, Status } from "@/types";
import { addBlogAPI } from "@/api/blog";
import { ToastContainer } from "react-toastify";
import { VscLayersActive } from "react-icons/vsc";
import draftToHtml from "draftjs-to-html";
import FormError from "@/components/Common/FormError";
import { areObjectsEqual } from "@/utilities";
import ConfirmDialog from "@/components/Common/Dialog";
import { useRouter } from "next/navigation";

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
}

const AddNewBlog: React.FC<IAddNewBlog> = ({ defaultValue, isEdit }) => {
  const [editorState, setEditorState] = React.useState(() => {
    if (defaultValue.blog_content) {
      const blocksFromHTML = convertFromHTML(defaultValue.blog_content);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });

  const router = useRouter();
  const [contentState, setContentState] = React.useState<any>(null);
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
      let isDataChange = !areObjectsEqual(defaultValue, data);
      //check data and save
      console.log("========= isDataChange: ", isDataChange);
      console.log("========= type: ", typeof data.blog_image_url);
    } else {
      addBlogAPI({
        ...data,
        blog_content: contentState,
        blog_image_url: image,
      });
    }
  };

  const handleContentStateChange = (contentState: any) => {
    setContentState(draftToHtml(contentState));
  };

  const handleEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
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
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={handleEditorStateChange}
              onContentStateChange={handleContentStateChange}
              editorStyle={{ lineHeight: "100%" }}
              // toolbarCustomButtons={[<CustomToolbarEditor />]}
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
