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
import {
  IProductColor,
  IProductDetail,
  IProductVariant,
  PStatus,
  ProductType,
} from "@/types/type";
import { ToastContainer } from "react-toastify";
import { VscLayersActive } from "react-icons/vsc";
import FormError from "@/components/Common/FormError";
import { useRouter } from "next/navigation";
import { GrFormClose } from "react-icons/gr";
import dynamic from "next/dynamic.js";
import { getListImageUpload, mapImageList } from "@/utilities/commonUtilities";
import { FaArrowLeft } from "react-icons/fa";
import useFetchApi from "@/hooks/useFetchApi";
import API_ROUTES from "@/constants/apiRoutes";

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

const NoSSREditor = dynamic(() => import("../../design/Editor/index.jsx"), {
  ssr: false,
});

const ProductAdminForm: React.FC<IProductForm> = ({
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
  const { create, edit } = useFetchApi();

  const form = useForm<IProductFormValue>({
    defaultValues: defaultValue,
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
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

  useEffect(() => {
    if (defaultValue) {
      reset(defaultValue);
    }
    if (
      Array.isArray(defaultValue.product_images) &&
      defaultValue.product_images.length > 0
    ) {
      setAlbumImage(defaultValue.product_images);
    }

    setEditorContent(defaultValue.product_description);
  }, [defaultValue]);

  const onSubmit = async (data: IProductFormValue) => {
    if (isEdit) {
      if (!productID) return;
      const newData = {
        ...data,
      };

      //check and upload album image if change
      let newAlbumImage: string[] = [...albumImage];
      const imagesNeedToUpload = getListImageUpload(albumImage);
      if (imagesNeedToUpload.length > 0) {
        try {
          const res: any = await create(
            API_ROUTES.image.uploadMany,
            imagesNeedToUpload,
            true
          );

          if (res && res.urls) {
            newAlbumImage = mapImageList(albumImage, res.urls);
          }
        } catch (error) {
          console.log(error);
        }
      }
      newData.product_images = newAlbumImage;

      //check and upload variant image if change
      const variantImages = data.variants.map((item) => {
        console.log(item.image_url?.length);
        if (typeof item.image_url === "object" && item.image_url.length > 0) {
          return item.image_url[0];
        }
        return item.image_url;
      });
      const variantImagesNeedToUpload: Array<string | File> =
        getListImageUpload(variantImages);
      let newVariant: IProductVariant[] = structuredClone(data.variants);

      if (variantImagesNeedToUpload.length > 0) {
        try {
          const res: any = await create(
            API_ROUTES.image.uploadMany,
            variantImagesNeedToUpload,
            true
          );

          if (res && res.urls) {
            const newVariantImages = mapImageList(variantImages, res.urls);
            newVariant = data.variants.map((item, index) => {
              if (typeof item.image_url === "string") {
                return item;
              } else {
                return {
                  ...item,
                  image_url: newVariantImages[index],
                };
              }
            });
          }
        } catch (error) {
          console.log(error);
        }
      }

      newData.variants = newVariant;

      await edit(API_ROUTES.product.editProduct(Number(productID)), newData);
    } else {
      let colorImages: File[] = [];
      if (Array.isArray(data.variants) && data.variants.length > 0) {
        data.variants.forEach((element) => {
          colorImages.push(element.image_url[0]);
        });
      }

      //check how many file if more than 1 using uploadMany, if 1 use upload
      Promise.all([
        create(API_ROUTES.image.uploadMany, albumImage, true),
        create(API_ROUTES.image.uploadMany, colorImages, true),
      ])
        .then((results: any) => {
          const newColorVariant = data.variants.map((item, index) => {
            return { ...item, image_url: results[1]?.urls[index] };
          });
          const newData = {
            ...data,
            product_images: results[0].urls,
            product_description: editorContent,
            variants: newColorVariant,
          };

          return create(API_ROUTES.product.addProduct, newData, false);
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

  const handleBackToListBlog = () => {
    router.push("/admin/product-management");
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
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
              <FaArrowLeft />
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
                              accept="image/webp"
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
                                        ? field.value
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
                <span>Album ảnh (webp)</span>
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
                      accept="image/webp"
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
                              <div
                                className="album-image-preview-item"
                                key={item}
                              >
                                <img
                                  src={
                                    typeof item === "string"
                                      ? item
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
    </form>
  );
};

export default ProductAdminForm;
