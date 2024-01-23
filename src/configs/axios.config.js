import axios from 'axios';
import { environment } from '../environments';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../services/auth.service';

const navigateToLogin = () => {
  const navigate = useNavigate();
  navigate('/login', { replace: true });
};

// axios auth instance
export const axiosAuthInstance = axios.create({
  baseURL: environment.BASE_URL,
  headers: { 'Content-Type': 'application/json', a },
});

const axiosRequestInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(async (config) => {
    const cookies = new Cookies();
    let accessToken = cookies.get('accessToken');

    if (!accessToken) {
      const refreshToken = cookies.get('refreshToken');

      if (!refreshToken) {
        navigateToLogin();
      }
      config.headers.Authorization = `Bearer ${refreshToken}`;

      const res = await refreshAccessToken();

      if (res?.data?.success) {
        cookies.set('accessToken', res.data.token.access);
        accessToken = res.data.token.access;
      } else {
        cookies.remove('refreshToken');
        navigateToLogin();
      }
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });
};
