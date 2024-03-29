import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const AuthGuard = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    if (!cookies?.accessToken) {
      navigate('/login', { replace: true });
    }
  }, [cookies?.accessToken, navigate]);

  return cookies?.accessToken ? children : null;
};

export default AuthGuard;
