import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type CountryValue = {
  code: string;
  name: string;
};

type TaskSaveParams = {
  username: string;
  country: CountryValue;
  tax: string;
};
const taskSave = async (params: TaskSaveParams) => {
  const result = await axios.patch("https://httpbin.org/status/200", params);
  return result?.data;
};

export const useTaskSave = () => {
  return useMutation({
    mutationFn: taskSave,
  });
};
