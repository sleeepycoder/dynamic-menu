import React,{useState} from 'react';
import { Menu ,MenuTheme} from 'antd';

const RenderMenu = ({ menuData }) => {

  const renderMenuItems = (items) => {
    return items.map(item => {
      if (item.children && item.children.length > 0) {
        return (
          <Menu.SubMenu key={item.menuId} title={item.item}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.menuId} icon={item.type === 'Image' ? <img src={item.script} alt={item.item} style={{ width: '20px', height: '20px' }} /> : null}>
            {item.item}
          </Menu.Item>
        );
      }
    });
  };

  return (
    <Menu mode="horizontal" style={{ backgroundColor: '#f0f2f5', borderBottom: '1px solid #ccc' }}>
      {Array.isArray(menuData) && menuData.map(item => (
        item.children && item.children.length > 0 ? (
          <Menu.SubMenu key={item.menuId} title={item.item}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.menuId} icon={item.type === 'Image' ? <img src={item.script} alt={item.item} style={{ width: '20px', height: '20px' }} /> : null}>
            {item.item}
          </Menu.Item>
        )
      ))}
    </Menu>
  );
};

export default RenderMenu;
