import { createContext, useContext, useEffect, useState } from 'react';

//api here is an axios instance which has the baseURL set according to the env.
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import urls from 'constants/api';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState();
  const [ads, setAds] = useState(null);
  const [compareAds, setCompareAds] = useState([]);
  async function loadUserFromCookies() {
    const token = getCookie('token');
    const user = getCookie('user');
    setLoading(true);
    try {
      const { data: category } = await axios.get(`${urls['test']}/category`);
      setCategories(category.categories);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
    if (token && token != undefined) {
      try {
        const { data: data } = await axios.get(`${urls['test']}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Headers': '*',
          },
        });

        setUser(data);
        setCookie('user', data);
      } catch (error) {
        console.log(error.response.data.message);
        logout();
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  const login = async (email, password) => {
    const token = getCookie('token');

    if (!token) {
      setLoading(true);
      try {
        const { data: data } = await axios.post(`${urls['test']}/auth/login`, {
          email,
          password,
        });

        if (!data) {
          toast({
            title: 'И-майл хаяг эсвэл нууц үг буруу байна.',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
        } else {
          if (data?.token && data.user.status == 'active') {
            setCookie('token', data.token);

            setUser(data.user);
            toast({
              title: 'Амжилттай нэвтэрлээ',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
            if (data.user.userType == 'admin' || data.user.userType == 'system')
              window.location.pathname = '/admin';
            else window.location.pathname = '/account';
          } else {
            window.location.pathname = '/account/check';
          }
        }
      } catch (error) {
        setLoading(false);
        toast({
          title: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      setLoading(false);
    }
  };
  const signup = async (email, password, username, phone) => {
    const token = getCookie('token');

    if (!token) {
      setLoading(true);
      try {
        const { data: data } = await axios.post(
          `${urls['test']}/auth/register`,
          {
            email,
            password,
            username,
            phone,
            isAdmin: false,
          }
        );

        if (!data) {
          window.location.pathname = '/account/check';
        }
      } catch (err) {
        setLoading(false);
        console.log(err.response.data.message);
      }
    }
    setLoading(false);
  };

  const logout = () => {
    deleteCookie('token');
    setUser(null);
    setLoading(false);
    window.location.pathname = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        logout,
        setLoading,
        categories,
        signup,
        ads,
        setAds,
        setCompareAds,
        compareAds,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
