const axiosMock: any = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: {
      use: jest.fn(),
    },
  },
  create: jest.fn(function () {
    return axiosMock;
  }),
};

export default axiosMock;