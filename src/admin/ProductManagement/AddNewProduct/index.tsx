"use client";
import React, { useEffect, useState } from "react";
import {
  BsCamera,
  BsFillImageFill,
  BsImageFill,
  BsTrash,
} from "react-icons/bs";
import { BiCategory, BiPlus, BiSolidSave } from "react-icons/bi";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { IProductColor, IProductDetail, PStatus, ProductType } from "@/types";
import { ToastContainer } from "react-toastify";
import { VscLayersActive } from "react-icons/vsc";
import FormError from "@/components/Common/FormError";
import ConfirmDialog from "@/components/Common/Dialog";
import { useRouter } from "next/navigation";
import { AiOutlineUpload } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import dynamic from "next/dynamic.js";
import { upLoadImages } from "@/api/image";
import { DevTool } from "@hookform/devtools";
import { addProductAPI, editProductAPI } from "@/api/product";

export interface IProductFormValue {
  product_name: string;
  product_price: number;
  product_description: string;
  product_feature: string;
  product_detail: IProductDetail[];
  variants: IProductColor[];
  product_type: ProductType;
  product_meta: string;
  product_status: PStatus;
  product_images: string[];
}

interface IProductForm {
  isEdit: boolean;
  defaultValue: IProductFormValue;
  productID?: string;
}

const NoSSREditor = dynamic(
  () => import("../../BlogManagement/Editor/index.jsx"),
  {
    ssr: false,
  }
);

const ProductForm: React.FC<IProductForm> = ({
  defaultValue,
  isEdit,
  productID,
}) => {
  const [editorContent, setEditorContent] = useState<string>(() => {
    if (defaultValue.product_description !== "") {
      return defaultValue.product_description;
    } else {
      return "";
    }
  });

  const router = useRouter();
  const [albumImage, setAlbumImage] = useState<any[]>([]);

  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  const form = useForm<IProductFormValue>({
    defaultValues: defaultValue,
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "product_detail",
  });

  const {
    fields: colorFields,
    append: colorAppend,
    remove: colorRemove,
  } = useFieldArray({
    control,
    name: "variants",
  });

  useEffect(() => {
    if (
      Array.isArray(defaultValue.product_images) &&
      defaultValue.product_images.length > 0
    ) {
      setAlbumImage(defaultValue.product_images);
    }
  }, []);

  const onSubmit = (data: IProductFormValue) => {
    if (isEdit) {
      editProductAPI(data, productID ?? "");
    } else {
      let colorImages: File[] = [];
      if (Array.isArray(data.variants) && data.variants.length > 0) {
        data.variants.forEach((element) => {
          colorImages.push(element.image_url[0]);
        });
      }

      Promise.all([upLoadImages(albumImage), upLoadImages(colorImages)])
        .then((results) => {
          const newColorVarient = data.variants.map((item, index) => {
            return { ...item, image_url: results[1].urls[index] };
          });
          const newData = {
            ...data,
            product_images: results[0].urls,
            product_description: editorContent,
            variants: newColorVarient,
          };

          return addProductAPI(newData);
        })
        .then((result) => {})
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const loadAlbumImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files) {
        const newImages = Array.from(event.target.files);
        setAlbumImage((prevImages) => [...prevImages, ...newImages]);
      }
    } catch (error) {}
  };

  const removeAlbumImageItem = (image: string) => {
    if (image) {
      const items = albumImage.filter((item) => item !== image);

      setAlbumImage(items);
    }
  };

  const handleSaveChange = () => {
    //lưu chỉnh sửa ở đây
  };

  const handleBackToListBlog = () => {
    router.push("/admin/product-management");
  };

  const handleUploadMultipleImages = async () => {
    try {
      const res = await upLoadImages(albumImage);
    } catch (error) {}
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
            {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
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
              <span> {isEdit ? "Lưu chỉnh sửa" : "Lưu sản phẩm"}</span>
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
                name="product_name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Bạn cần phải nhập trường này!",
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
              {errors.product_name && (
                <FormError message={errors.product_name.message} />
              )}
            </div>

            <div className="form-control">
              <div className="form-control-title">
                <span>Giá sản phẩm</span>
                <div>*</div>
              </div>

              <Controller
                name="product_price"
                control={control}
                rules={{
                  required: "Bạn cần phải nhập trường này!",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    onBlur={() => {
                      if (!field.value) {
                        field.onChange("");
                      }
                    }}
                    placeholder="Nhập giá sản phẩm"
                    className="admin-input"
                    id="text"
                  />
                )}
              />
              {errors.product_price && (
                <FormError message={errors.product_price.message} />
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
                  name="product_type"
                  control={control}
                  rules={{ required: "Bạn cần phải nhập trường này!" }}
                  render={({ field }) => (
                    <select {...field}>
                      <option value={ProductType.CHAIR}>Bọc ghế da</option>
                      <option value={ProductType.STEERING_WHEEL}>
                        Bọc vô lăng
                      </option>
                      <option value={ProductType.PILLOW}>Gối cổ</option>
                      <option value={ProductType.FLOOR}>Thảm lót sàn</option>
                      <option value={ProductType.OTHER}>Sản phẩm khác</option>
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
                  name="product_status"
                  control={control}
                  rules={{ required: "Bạn cần phải nhập trường này!" }}
                  render={({ field }) => (
                    <select {...field}>
                      <option value={PStatus.ACTIVE}>Hoạt động</option>
                      <option value={PStatus.SUSPENDED}>Ngưng hoạt động</option>
                    </select>
                  )}
                />
              </div>
            </div>

            <div className="form-control">
              <div className="form-control-title">
                <span>Tính năng sản phẩm</span>
                <div>*</div>
              </div>

              <Controller
                name="product_feature"
                control={control}
                defaultValue=""
                rules={{
                  required: "Bạn cần phải nhập trường này!",
                }}
                render={({ field }) => (
                  <textarea
                    className="text-[13px]"
                    {...field}
                    rows={4}
                    placeholder="Nhập tính năng sản phẩm"
                  />
                )}
              />

              {errors.product_feature && (
                <FormError message={errors.product_feature.message} />
              )}
            </div>

            <div className="form-control">
              <div className="form-control-title">
                <span>Product Meta</span>
                <div>*</div>
              </div>

              <Controller
                name="product_meta"
                control={control}
                defaultValue=""
                rules={{
                  required: "Bạn cần phải nhập trường này!",
                }}
                render={({ field }) => (
                  <textarea
                    className="text-[13px]"
                    {...field}
                    rows={4}
                    placeholder="Nhập mô tả"
                  />
                )}
              />

              {errors.product_meta && (
                <FormError message={errors.product_meta.message} />
              )}
            </div>

            <div className="form-control">
              <div className="form-control-title">
                <span>Thống số kĩ thuật</span>
                <div>*</div>
              </div>

              <div className="mt-5">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex mb-3 gap-5">
                    <div className="w-[500px]">
                      <Controller
                        name={`product_detail.${index}.name`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            placeholder="Nhập tên"
                            className="w-[300px]"
                          />
                        )}
                      />
                    </div>

                    <div className="w-[500px]">
                      <Controller
                        name={`product_detail.${index}.value`}
                        control={control}
                        render={({ field }) => (
                          <input {...field} placeholder="Nhập nội dung" />
                        )}
                      />
                    </div>

                    <button
                      className="admin-button delete"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <BsTrash />
                      <span> Xóa</span>
                    </button>
                  </div>
                ))}

                <button
                  className="admin-button primary mt-2"
                  type="button"
                  onClick={() => append({ name: "", value: "" })}
                >
                  <BiPlus />
                  <span> Thêm thông tin</span>
                </button>
              </div>
            </div>

            <div className="form-control">
              <div className="form-control-title mt-2">
                <span>Màu sắc sản phẩm</span>
                <div>*</div>
              </div>

              <div className="mt-5">
                {colorFields.map((field, index) => (
                  <div key={field.id} className="flex mb-5 gap-5">
                    <div className="">
                      <Controller
                        name={`variants.${index}.variant_color`}
                        control={control}
                        render={({ field }) => (
                          <input {...field} type="color" />
                        )}
                      />
                    </div>

                    <div className="">
                      <Controller
                        name={`variants.${index}.image_url`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              type="file"
                              accept="image/*"
                              id={"file" + index}
                              onChange={(e) => {
                                return field.onChange(e.target.files);
                              }}
                              style={{ display: "none" }}
                            />
                            <div className="form-img-container rect250">
                              <div className="w-full h-full flex justify-center items-center overflow-hidden">
                                {field.value ? (
                                  <img
                                    src={
                                      typeof field.value === "string"
                                        ? "http://" + field.value
                                        : URL.createObjectURL(field.value[0])
                                    }
                                    className="w-full h-full object-cover rounded-md"
                                    width="200"
                                    alt="preview"
                                  />
                                ) : (
                                  <div>
                                    <BsFillImageFill className="empty-icon" />
                                  </div>
                                )}
                              </div>

                              <div className="icon-wrapper">
                                <label
                                  htmlFor={"file" + index}
                                  style={{ cursor: "pointer" }}
                                >
                                  <BsCamera className="icon" />
                                </label>
                              </div>
                            </div>
                          </>
                        )}
                      />
                    </div>

                    <button
                      className="admin-button delete h-fit"
                      type="button"
                      onClick={() => colorRemove(index)}
                    >
                      <BsTrash />
                      <span> Xóa</span>
                    </button>
                  </div>
                ))}

                <button
                  className="admin-button primary mt-2"
                  type="button"
                  onClick={() =>
                    colorAppend({ variant_color: "", image_url: "" })
                  }
                >
                  <BiPlus />
                  <span> Thêm thông tin</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="form-part-wrapper">
          <p className="form-part-title">Media</p>
          <div className="form-content">
            <div className="form-control flex-1">
              <div className="form-control-title">
                <span>Album ảnh</span>
              </div>

              <Controller
                name="product_images"
                control={control}
                rules={{
                  required: "Image is required",
                }}
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      id="albumImg"
                      multiple={true}
                      onChange={(e) => {
                        loadAlbumImage(e);
                        return field.onChange(e.target.files);
                      }}
                      style={{ display: "none" }}
                    />
                    <div className="">
                      <div className="album-image-preview-wrapper">
                        {Array.isArray(albumImage) &&
                          albumImage.length > 0 &&
                          albumImage.map((item) => {
                            return (
                              <div className="album-image-preview-item">
                                <img
                                  src={
                                    typeof item === "string"
                                      ? "http://" + item
                                      : URL.createObjectURL(item)
                                  }
                                  alt=""
                                />
                                <div
                                  className="close-icon "
                                  onClick={() => removeAlbumImageItem(item)}
                                >
                                  <GrFormClose />
                                </div>
                              </div>
                            );
                          })}
                      </div>

                      <div className="flex gap-5">
                        <label htmlFor="albumImg" style={{ cursor: "pointer" }}>
                          <div className="admin-button primary">
                            <BsImageFill />
                            <span>Thêm ảnh</span>
                          </div>
                        </label>

                        <button
                          className="admin-button primary"
                          type="button"
                          onClick={handleUploadMultipleImages}
                        >
                          <AiOutlineUpload />
                          <span>Upload ảnh</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              />

              {errors.product_images && (
                <FormError message={errors.product_images.message} />
              )}
            </div>
          </div>
        </div>

        <div className="form-part-wrapper">
          <p className="form-part-title">Mô tả sản phẩm</p>

          <div className="form-content">
            <NoSSREditor
              setValue={(value: string) => setEditorContent(value)}
              value={editorContent}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
      <DevTool control={control} />
    </form>
  );
};

export default ProductForm;
