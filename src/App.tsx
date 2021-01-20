import React, { Suspense, useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { Button, Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './App.scss';
import logo from './assets/logo.png';
import { RootState } from './store';
// import {login} from "./store/main/actions";
import { Dict, MenuBar } from './store/dict/types';
import { routesConfigs } from './routes.config';
import { login, logout } from './store/main/actions';

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const displayName = useSelector((state: RootState) => state.main.displayName);
  const menus = useSelector((state: RootState) => state.dict.menus);
  const roles = useSelector((state: RootState) => state.main.roles);

  const [collapsed, setCollapsed] = useState(false);
  //取当前路由名称，让菜单高亮
  const [current, setCurrent] = useState(location.pathname.split('/')[1]);
  const [openKeys, setOpenKeys] = useState(new Array<string>());
  const rootPath = useSelector((state: RootState) => state.main.rootPath);

  useEffect(() => {
    console.log('current=' + current);

    if (current === "") {
      //setCurrent('login');
      history.push("/login");
    }
    if (rootPath && current === "") {
      setCurrent(rootPath.split("/")[1]);
      history.push(rootPath);
    }

    //展开所在菜单
    menus.forEach((menu) => {
      if (menu.ID === current) {
        setOpenKeys([current]);
        menu.children.forEach((m) => {
          let _id = m.ID ? m.ID.toString() : '';
          if (_id === location.pathname.split('/')[2]) {
            setCurrent(_id);
          }
        });
      }
    });

    if (localStorage.getItem("user") && current === "" && rootPath === null) {
      //取localStorage 自动登录
      console.log(localStorage.getItem("user"));

      var users = localStorage.getItem("user");
      if (users) {
        var user = JSON.parse(users);
        dispatch(login(user[0].userName, user[0].password));
      }
    }
  }, [dispatch, menus, current, location.pathname, history, rootPath]);

  //折叠菜单
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  //点击左侧菜单
  const menuClickHandler = (e: any) => {
    if (openKeys.length === 1) {
      history.push('/' + openKeys[0] + '/' + e.key);
    } else {
      history.push('/' + e.key);
    }
    setCurrent(e.key);
  };

  //展开左侧菜单
  const openChangeHandler: any = (arr: string[]) => {
    const latestOpenKey = arr.find((key) => openKeys.indexOf(key) === -1);
    if (menus.map((m) => m.ID).indexOf(latestOpenKey || '') === -1) {
      setOpenKeys(arr);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  //注销功能
  const onLogoutClickHandler = () => {
    localStorage.clear();
    // window.location.href = './login.html';
    let url = `/login`;
    //dispatch(selectInfr(row));

    history.push(url);
    setCurrent("");
    setOpenKeys([]);
    dispatch(logout());
  };

  const goHome = () => {
    setOpenKeys([]);
    setCurrent('home');
    history.push('/home');
  }

  //注销，切换用户
  const dropdown = () => (
    <Menu>
      <Menu.Item>
        <a
          rel="noopener noreferrer"
          href="#"
          onClick={() => onLogoutClickHandler()}
        >
          注销
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="main">
      <div className={['left', collapsed ? 'collapsed' : ''].join(' ')}>
        <div className="top">
          <Button
            type="link"
            onClick={toggleCollapsed}
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ color: 'white' }} />
              ) : (
                  <MenuFoldOutlined style={{ color: 'white' }} />
                )
            }
          />
        </div>
        <Menu
          className="custSubmenu"
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          onClick={menuClickHandler}
          selectedKeys={[current]}
          openKeys={openKeys}
          onOpenChange={openChangeHandler}
        >
          {menus
            .filter((menu: MenuBar) => {
              return menu.role ? roles.indexOf(menu.role) > -1 : true;
            })
            .map((menu: MenuBar) => {
              if (menu.children.length > 0) {
                return (
                  <Menu.SubMenu
                    disabled={rootPath == null}
                    key={menu.ID}
                    title={
                      <span>
                        <menu.icon />
                        <span>{menu.Title}</span>
                      </span>
                    }
                  >
                    {menu.children.map((m: Dict) => (
                      <Menu.Item key={m.ID}>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>{m.Title}</span>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={menu.ID}>
                    <menu.icon />
                    <span>{menu.Title}</span>
                  </Menu.Item>
                );
              }
            })}
        </Menu>
      </div>
      <div className="right">
        <div className="top">
          <img src={logo} alt="" onClick={goHome} />
          <div className="logo-title" onClick={goHome}>
            <p className="cn">中国海油井控管理信息系统</p>
            <p className="en">
              China Offshore oil Well Control Management Information System
            </p>
          </div>
          <div className="spacer" />
          <Dropdown overlay={dropdown}>
            <Button
              type="link"
              style={{ color: 'white' }}
              icon={<UserOutlined style={{ color: 'white' }} />}
            >
              {displayName}
            </Button>
          </Dropdown>
        </div>
        <div className="hh" />
        <Suspense fallback={null}>
          <Switch>
            {routesConfigs.map(
              (r) =>
                r.component && (
                  <Route
                    key={r.path}
                    path={r.path}
                    exact={r.exact}
                    component={r.component}
                  />
                )
            )}
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
