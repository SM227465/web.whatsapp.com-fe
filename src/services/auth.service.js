import { axiosAuthInstance } from '../configs/axios.config';

export const refreshAccessToken = async () => {
  try {
    return await axiosAuthInstance.post('/auth/refresh-token');
  } catch (error) {
    return error;
  }
};
