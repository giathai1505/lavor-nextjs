"use client";
import React, { useEffect, useRef, useState } from "react";
import { BsCamera, BsFillImageFill } from "react-icons/bs";
import { BiCategory, BiSolidSave } from "react-icons/bi";
import { useForm, Controller } from "react-hook-form";
import { IBrand, IModel, IVersion, IYear } from "@/types/type";
import { ToastContainer, toast } from "react-toastify";
import FormError from "@/components/Common/FormError";
import { AiOutlinePlus } from "react-icons/ai";
import AddYearDialog from "./Dialogs/AddYearDialog";
import AddBrandDialog from "./Dialogs/AddBrandDialog";
import AddModelDialog from "./Dialogs/AddModelDialog";
import AddVersionDialog from "./Dialogs/AddVersionDialog";
import {
  addCar,
  getAllBrands,
  getAllYears,
  getCar,
  updateCar,
} from "@/api/carAPI";
import { upLoadImage } from "@/api/imageAPI";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Each from "@/lib/Each";

export interface ICarFormValue {
  year: number;
  brand_id: number;
  model_id: number;
  version_id: number;
  image_url: string;
}

interface IAddCarForm {
  years: IYear[];
  brands: IBrand[];
}

const CarManagementForm: React.FC<IAddCarForm> = ({ brands, years }) => {
  const [image, setImage] = useState<any>();
  const [listYears, setListYears] = useState<IYear[]>([]);
  const [listBrands, setListBrands] = useState<IBrand[]>([]);
  const [listModels, setListModels] = useState<IModel[]>([]);
  const [listVersion, setListVersion] = useState<IVersion[]>([]);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const [showDialog, setShowDialog] = useState({
    year: false,
    branch: false,
    model: false,
    version: false,
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleResize = () => {
    if (imgContainerRef.current) {
      const width = imgContainerRef.current.clientWidth;
      imgContainerRef.current.style.height = `${width}px`;
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const form = useForm<ICarFormValue>({
    defaultValues: {
      year: Array.isArray(years) && years.length > 0 ? years[0].year : NaN,
      brand_id:
        Array.isArray(brands) && brands.length > 0 ? brands[0].brand_id : NaN,
    },
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const year = watch("year");
  const brandID = watch("brand_id");
  const modelID = watch("model_id");
  const versionID = watch("version_id");

  const invokeGetAllBrand = async (type?: string, id?: number) => {
    getAllBrands()
      .then((result) => {
        setListBrands(result);
      })

      .catch((error) => {
        setListBrands([]);
      });
  };

  const invokeCarByVersion = async (year: number, versionID: number) => {
    getCar(year, versionID)
      .then((result) => {
        if (result.image_url) {
          setImage(result.image_url);
          setIsEdit(true);
        } else {
          setImage(undefined);
          setIsEdit(false);
        }
      })
      .catch((err) => {
        setImage(undefined);
        setIsEdit(false);
      });
  };

  useEffect(() => {
    const models: IModel[] = (brands.find(
      (item) => item.brand_id === Number(brandID)
    )?.models || []) as IModel[];

    setListModels(models);

    if (models.length > 0) {
      setValue("model_id", models[0].model_id);
      const versions: IVersion[] = (models.find(
        (item) => item.model_id === Number(models[0].model_id)
      )?.versions || []) as IVersion[];

      setListVersion(versions);
      if (listVersion.length > 0) {
        setValue("version_id", listVersion[0].version_id);
      }
    } else {
      setListModels([]);
      setListVersion([]);
    }
  }, [brandID]);

  useEffect(() => {
    const versions: IVersion[] = (listModels.find(
      (item) => item.model_id === Number(modelID)
    )?.versions || []) as IVersion[];

    setListVersion(versions);
    if (versions.length > 0) {
      setValue("version_id", versions[0].version_id);
    } else {
      setListVersion([]);
    }
  }, [modelID]);

  useEffect(() => {
    invokeCarByVersion(year, versionID);
  }, [versionID, year]);

  useEffect(() => {
    const models: IModel[] = (listBrands.find(
      (item) => item.brand_id === Number(brandID)
    )?.models || []) as IModel[];

    setListModels(models);

    if (models.length > 0) {
      const versions: IVersion[] = (models.find(
        (item) => item.model_id === Number(modelID)
      )?.versions || []) as IVersion[];
      setListVersion(versions);
    } else {
      setListModels([]);
      setListVersion([]);
    }
  }, [listBrands]);

  useEffect(() => {
    setListYears(years);

    setListBrands(brands);

    if (brands.length > 0 && Array.isArray(brands[0].models)) {
      setListModels(brands[0].models);
      if (brands[0].models && brands[0].models.length > 0) {
        setListVersion(brands[0].models[0].versions);
      }
    }
  }, [brands, years]);

  const onSubmit = (data: ICarFormValue) => {
    if (typeof image === "string") return;
    if (isEdit) {
      const loadingToastId = toast.info("Đang chỉnh sửa...", {
        position: "top-center",
        autoClose: false,
      });
      Promise.resolve(upLoadImage(image))
        .then((results) => {
          const newData = {
            ...data,
            image_url: results.url,
          };
          return updateCar(newData);
        })
        .then((result) => {
          toast.dismiss(loadingToastId);
          toast.success("Sửa thành công!!!", {
            position: "top-center",
          });
        })
        .catch((error) => {
          toast.dismiss(loadingToastId);
          toast.error("Sửa thất bại!!!", {
            position: "top-center",
          });
          console.error("Error:", error);
        });
    } else {
      const loadingToastId = toast.info("Đang thêm  xe...", {
        position: "top-center",
        autoClose: false,
      });
      Promise.resolve(upLoadImage(image))
        .then((results) => {
          const newData = {
            ...data,
            image_url: results.url,
          };
          return addCar(newData);
        })
        .then((result) => {
          toast.dismiss(loadingToastId);
          toast.success("Thêm xe thành công!!!", {
            position: "top-center",
          });
        })
        .catch((error) => {
          toast.dismiss(loadingToastId);
          toast.error("Thêm xe thất bại!!!", {
            position: "top-center",
          });
          console.error("Error:", error);
        });
    }
  };

  const loadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const closeAllDialog = () => {
    setShowDialog({
      year: false,
      branch: false,
      model: false,
      version: false,
    });
  };

  const handleAddYearSuccess = async (year: number) => {
    const years = await getAllYears();
    setListYears(years);
    setValue("year", year);
    closeAllDialog();
  };

  const handleAddBrandSuccess = (brand_id: number) => {
    invokeGetAllBrand("brand", brand_id);
    setValue("brand_id", brand_id);
    closeAllDialog();
  };

  const handleAddModelSuccess = async (model_id: number, brand_id: number) => {
    invokeGetAllBrand("model", model_id);
    setValue("brand_id", brand_id);
    setValue("model_id", model_id);
    closeAllDialog();
  };

  const handleAddVersionSuccess = (version_id: number) => {
    setValue("version_id", version_id);
    invokeGetAllBrand("version", 0);
    closeAllDialog();
  };

  return (
    <>
      <AddYearDialog
        open={showDialog.year}
        onClose={closeAllDialog}
        onSuccess={handleAddYearSuccess}
      />
      <AddBrandDialog
        open={showDialog.branch}
        onClose={closeAllDialog}
        onSuccess={handleAddBrandSuccess}
      />
      <AddModelDialog
        open={showDialog.model}
        onClose={closeAllDialog}
        listBrands={listBrands}
        activeBrand={brandID}
        onSuccess={handleAddModelSuccess}
      />
      <AddVersionDialog
        open={showDialog.version}
        onClose={closeAllDialog}
        listModel={listModels}
        activeModel={modelID}
        onSuccess={handleAddVersionSuccess}
      />
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex justify-between items-center bg-white mb-5 p-5">
            <p className="admin-title">
              {isEdit ? "Chỉnh sửa xe" : "Thêm xe mới"}
            </p>
            <div className="flex items-center gap-2 flex-none">
              <Link
                type="button"
                href={"/admin/car-management"}
                className="admin-button basic"
              >
                <FaArrowLeft />
                Quay lại danh sách
              </Link>

              <button
                className={`admin-button primary  ${
                  typeof image === "string" || image === undefined
                    ? "disabled"
                    : ""
                }`}
                type="submit"
              >
                <BiSolidSave />
                <span> {isEdit ? "Lưu chỉnh sửa" : "Lưu thông tin xe"}</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-10">
            <div className="form-part-wrapper col-span-2">
              <p className="form-part-title">Thông tin cơ bản</p>
              <div className="form-content">
                <div className="form-control">
                  <div className="form-control-title">
                    <span>Năm đời xe</span>
                    <div>*</div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="form-control-body min-w-[500px]">
                      <BiCategory />
                      <Controller
                        name="year"
                        control={control}
                        rules={{ required: "Bạn cần phải nhập trường này!" }}
                        render={({ field }) => (
                          <select {...field}>
                            <Each
                              of={listYears}
                              render={(item, _) => (
                                <option value={item.year}>{item.year}</option>
                              )}
                            />
                          </select>
                        )}
                      />
                    </div>
                    <button
                      className="admin-button primary flex-none minW-200  justify-center"
                      type="button"
                      onClick={() =>
                        setShowDialog({
                          year: true,
                          branch: false,
                          model: false,
                          version: false,
                        })
                      }
                    >
                      <AiOutlinePlus />
                      <span>Thêm năm</span>
                    </button>
                  </div>
                </div>

                <div className="form-control">
                  <div className="form-control-title">
                    <span>Hãng xe</span>
                    <div>*</div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="form-control-body min-w-[500px]">
                      <BiCategory />
                      <Controller
                        name="brand_id"
                        control={control}
                        rules={{ required: "Bạn cần phải nhập thông tin này!" }}
                        render={({ field }) => (
                          <select {...field}>
                            <Each
                              of={listBrands}
                              render={(item) => (
                                <option value={item.brand_id}>
                                  {item.brand_name}
                                </option>
                              )}
                            />
                          </select>
                        )}
                      />
                    </div>
                    <button
                      className="admin-button primary flex-none minW-200  justify-center"
                      type="button"
                      onClick={() =>
                        setShowDialog({
                          year: false,
                          branch: true,
                          model: false,
                          version: false,
                        })
                      }
                    >
                      <AiOutlinePlus />
                      <span>Thêm hãng xe</span>
                    </button>
                  </div>
                </div>

                <div className="form-control">
                  <div className="form-control-title">
                    <span>Model xe</span>
                    <div>*</div>
                  </div>
                  {listModels.length === 0 ? (
                    <div className="mb-2">
                      <FormError message="Hãng này chưa có model nào, vui lòng thêm model!" />
                    </div>
                  ) : null}

                  <div className="flex items-center gap-5">
                    <div
                      className={`form-control-body ${
                        listModels.length === 0 && "disable"
                      }`}
                    >
                      <BiCategory />
                      <Controller
                        name="model_id"
                        control={control}
                        rules={{ required: "Bạn cần phải nhập trường này!" }}
                        render={({ field }) => (
                          <select {...field} placeholder="Chưa có model nào">
                            {Array.isArray(listModels) &&
                              listModels.length > 0 &&
                              listModels.map((item) => {
                                return (
                                  <option value={item?.model_id}>
                                    {item?.model_name}
                                  </option>
                                );
                              })}
                          </select>
                        )}
                      />
                    </div>
                    <button
                      className="admin-button primary flex-none minW-200  justify-center"
                      type="button"
                      onClick={() =>
                        setShowDialog({
                          year: false,
                          branch: false,
                          model: true,
                          version: false,
                        })
                      }
                    >
                      <AiOutlinePlus />
                      <span>Thêm model xe</span>
                    </button>
                  </div>
                </div>

                <div className="form-control">
                  <div className="form-control-title">
                    <span>Phiên bản</span>
                    <div>*</div>
                  </div>
                  {listModels.length !== 0 && listVersion.length === 0 ? (
                    <div className="mb-2">
                      <FormError message="Model này chưa có version nào, vui lòng thêm version!" />
                    </div>
                  ) : null}

                  <div className="flex items-center gap-5">
                    <div
                      className={`form-control-body ${
                        listVersion.length === 0 && "disable"
                      }`}
                    >
                      <BiCategory />
                      <Controller
                        name="version_id"
                        control={control}
                        rules={{ required: "Bạn cần phải nhập trường này!" }}
                        render={({ field }) => (
                          <select {...field}>
                            {Array.isArray(listVersion) &&
                              listVersion.length > 0 &&
                              listVersion.map((item) => {
                                return (
                                  <option value={item?.version_id}>
                                    {item?.version_name}
                                  </option>
                                );
                              })}
                          </select>
                        )}
                      />
                    </div>
                    <button
                      className="admin-button primary flex-none minW-200 justify-center"
                      type="button"
                      onClick={() =>
                        setShowDialog({
                          year: false,
                          branch: false,
                          model: false,
                          version: true,
                        })
                      }
                    >
                      <AiOutlinePlus />
                      <span>Thêm phiên bản mới</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-part-wrapper">
              <p className="form-part-title">Media</p>
              <div className="form-content">
                <div className="form-control">
                  <div className="form-control-title">
                    <span>Ảnh chính</span>
                    <div>*</div>
                  </div>

                  <div className="w-full">
                    <Controller
                      name="image_url"
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
                          <div className="p-5 pt-0">
                            <div
                              className="form-img-container"
                              ref={imgContainerRef}
                            >
                              <div className="w-full h-full flex justify-center items-center">
                                {image ? (
                                  <img
                                    src={
                                      typeof image === "string"
                                        ? image
                                        : URL.createObjectURL(image)
                                    }
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
                                <label
                                  htmlFor="file"
                                  style={{ cursor: "pointer" }}
                                >
                                  <BsCamera className="icon" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    />
                  </div>

                  {errors.image_url && (
                    <FormError message={errors.image_url.message} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </form>
    </>
  );
};

export default CarManagementForm;
