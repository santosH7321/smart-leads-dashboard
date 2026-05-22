import axiosInstance from "../api/axios";

export const signupUser = async (
  data: {
    name: string;
    email: string;
    password: string;
  }
) => {
  const response = await axiosInstance.post(
    "/auth/signup",
    data
  );

  return response.data;
};

export const loginUser = async (
  data: {
    email: string;
    password: string;
  }
) => {
  const response = await axiosInstance.post(
    "/auth/login",
    data
  );

  return response.data;
};

export const refreshToken = async () => {
  const response = await axiosInstance.post(
    "/auth/refreshtoken"
  );

  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post(
    "/auth/logout"
  );

  return response.data;
};