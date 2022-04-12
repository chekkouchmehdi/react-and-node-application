import api from "../../helpers/requestApi";

export const add = async (id?: string, content?: string) => {
  try {
    const response = await api({
      url: `http://localhost:8888/api/v1/doc`,
      method: "post",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      data: {
        content,
        id,
      },
    });

    return response.data;
  } catch (error) {
    return null;
  }
};

export const get = async () => {
  try {
    const response = await api.get("http://localhost:8888/api/v1/doc", {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });

    return response.data;
  } catch (error) {
    return {};
  }
};

export const download = async (id: string) => {
  try {
    api({
      url: `http://localhost:8888/api/v1/doc/${id}`,
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    });
  } catch (error) {
    return null;
  }
};

const getToken = async () => {
  return await localStorage.getItem("jwt");
};
