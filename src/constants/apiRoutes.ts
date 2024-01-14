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
  car: {},
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
};

export default API_ROUTES;
