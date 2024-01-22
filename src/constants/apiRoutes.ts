const API_ROUTES = {
  agency: {
    getAll: "/agencies",
    deleteOne: (id: number) => `/agencies/${id.toString()}`,
    addCity: (regionId: number) =>
      `/agencies/regions/${regionId.toString()}/cities`,
    addAgency: (cityId: number) => `/agencies/cities/${cityId.toString()}`,
  },
  blogs: {
    getAll: (url: string) => `blogs${url}`,
    addBlog: "/blogs",
    editBlog: (id: number) => `/blogs/${id.toString()}`,
    deleteOne: (id: number) => `/blogs/${id.toString()}`,
    deleteMany: "/blogs",
    changeStatus: (id: number) => `/blogs/${id.toString()}/status`,
    changeManyStatus: `/blogs/status`,
  },
  car: {
    getAllYears: "/design/years",
    getAllBrands: "/design/brands",
    getCarTable: "design/cars",
    getCarsByYear: (year: number) => `design/years/${year.toString()}/cars`,
    getCar: (year: number, version: number) =>
      `design/years/${year.toString()}/versions/${version.toString()}/cars`,
    addYear: "design/years",
    addBrand: "design/brands",
    addVersion: (modelID: number) =>
      `design/models/${modelID.toString()}/versions`,
    addModel: (brandID: number) => `design/brands/${brandID.toString()}/models`,
    addCar: (year: number, versionID: number) =>
      `design/years/${year.toString()}/versions/${versionID.toString()}/cars`,
  },
  image: {
    upload: "/images/upload",
    uploadMany: "/images/upload-many",
  },
  product: {
    getAll: (url: string) => `products${url}`,
    addProduct: "/products",
    editProduct: (id: number) => `/products/${id.toString()}`,
    deleteOne: (id: number) => `/products/${id.toString()}`,
    deleteMany: "/products",
    changeStatus: (id: number) => `/blogs/${id.toString()}/status`,
  },
  review: {
    getAllApprove: "/review",
    getAllPending: "/review?withPending=true",
    approve: (id: number) => `/review/${id.toString()}/approve`,
    deleteOne: (id: number) => `/review/${id.toString()}`,
    addReview: "/review",
  },
  auth: {},
  email: {
    sendContact: "/design/contact",
    sendOrder: "/products/order",
    sendDesign: "/design/order",
  },
};

export default API_ROUTES;
