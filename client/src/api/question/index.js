import axios from "axios";

export const getQuestions = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/v1/question");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const getQuestionById = async (id) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/question/${id}`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const deleteQuestion = async (id) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:3000/api/v1/question/${id}`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const createQuestion = async (data) => {
  try {
    const { data: question } = await axios.post(
      "http://localhost:3000/api/v1/question",
      data
    );
    return question;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const updateQuestion = async (id, data) => {
  try {
    const { data: question } = await axios.put(
      `http://localhost:3000/api/v1/question/${id}`,
      data
    );
    return question;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};
