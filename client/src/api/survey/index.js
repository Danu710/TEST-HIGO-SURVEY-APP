import axios from "axios";

export const getSurveys = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/v1/survey");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const getSurveyById = async (id) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/survey/${id}`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const deleteSurvey = async (id) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:3000/api/v1/survey/${id}`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const createSurvey = async (data) => {
  try {
    const { data: survey } = await axios.post(
      "http://localhost:3000/api/v1/survey",
      data
    );
    return survey;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const updateSurvey = async (id, data) => {
  try {
    const { data: survey } = await axios.put(
      `http://localhost:3000/api/v1/survey/${id}`,
      data
    );
    return survey;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};
