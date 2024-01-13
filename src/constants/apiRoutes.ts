const API_ROUTES = {
  agency: {
    getAll: "/agencies",
    deleteOne: (id: number) => `/agencies/${id.toString()}`,
    addCity: (regionId: number) =>
      `/agencies/regions/${regionId.toString()}/cities`,
    addAgency: (cityId: number) => `/agencies/cities/${cityId.toString()}`,
  },
  blogs: {},
  car: {},
  image: {},
  product: {},
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
