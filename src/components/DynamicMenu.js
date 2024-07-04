import React, { useEffect, useState } from 'react';
import { Menu, Spin, Alert } from 'antd';
import axios from 'axios';
import RenderMenu from './RenderMenu';

const DynamicMenu = () => {
  const [menuData, setMenuData] = useState([]);
  // console.log(menuData);y
  
  const [token, setToken] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post('http://appnox-tm.it/api/login', {
        "user": "AdminPro",
        "password": "Mnop@1234"
            
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        if (response.data.result && response.data.result.key) {
          setToken(response?.data?.result?.key);
        } else {
          throw new Error('Access token not found in the response');
        }
      } catch (error) {
        setError(`Error fetching access token: ${error.message}`);
        console.error('Error fetching access token', error);
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

useEffect(() => {
    if (token) {
     
      const fetchMenuTree = async () => {
        try {

            const response = await axios.get('http://appnox-tm.it/api/v1/menu/tree', {
                headers: {
                    Authorization: `Bearer ${token}`
                    }  
          });
        
          if (response.data) {
            setMenuData(response.data.result.data);
          } else {
            throw new Error('Menu data not found in the response');
          }
        } catch (error) {
          setError(`Error fetching menu tree: ${error.message}`);
          console.error('Error fetching menu tree', error);
        } finally {
          setLoading(false);
        }
      };

      fetchMenuTree();
    }
  }, [token]);



  if (loading) {
    return <Spin tip="Loading menu..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <Menu mode="vertical">
  <RenderMenu menuData ={menuData}/>
    </Menu>
  );
};

export default DynamicMenu;
