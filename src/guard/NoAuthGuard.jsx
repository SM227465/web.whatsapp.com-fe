import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const NoAuthGuard = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    console.log(cookies);
    if (cookies?.accessToken) {
      navigate('/', { replace: true });
    }
  }, [cookies?.accessToken, navigate]);

  return cookies?.accessToken ? children : null;
};

export default NoAuthGuard;
