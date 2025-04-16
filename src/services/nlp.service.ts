import axios from "axios";

export const classify = async (text: string) => {
    const result = await axios.post("http://localhost:5000/classify", { text });
    return result;
  };