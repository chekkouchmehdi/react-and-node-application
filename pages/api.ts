import api from "../helpers/requestApi";

export const login = async (email?: string, password?: string) => {
  try {
    const response = await api.post("http://localhost:8888/api/v1/login", {
      username: email,
      password,
    });
    localStorage.setItem("jwt", response.data.accessToken);
    if (response.data.accessToken) return true;
    else return false;
  } catch (error) {
    return false;
  }
};
