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
  review: {},
  auth: {},
  users: {
    getAll: "/api/users",
    getById: (userId: number) => `/api/users/${userId.toString()}`,
  },
  posts: {
    getAll: "/api/posts",
    getById: (postId: number) => `/api/posts/${postId.toString()}`,
  },
};

export default API_ROUTES;
