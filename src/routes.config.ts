import React from 'react';
import Login from './pages/Login';

//404
const NotFound = React.lazy(() => {
  return import('./pages/404');
});

//系统代码
const CodeIndex = React.lazy(() => {
  return import('./pages/code/Index');
});

//标准名称
const StandardIndex = React.lazy(() => {
  return import('./pages/standard/Index');
});
//如何链接手机
const MobileSettings = React.lazy(() => {
  return import('./pages/intro/MobileSettings');
});

//巡检记录
const RecordIndex = React.lazy(() => {
  return import('./pages/record/Index');
});
//巡检记录详情
const RecordDetail = React.lazy(() => {
  return import('./pages/record/Detail');
});
//首页
const Home = React.lazy(() => {
  return import('./pages/home/Home');
});

//用户管理
const UserManage = React.lazy(() => {
  return import("./pages/intro/UserManage");
});

interface RouteConfig {
  path: string;
  component?: React.FC;
  exact?: boolean;
  breadcrumbName?: string;
}

export const routesConfigs: Array<RouteConfig> = [
  {
    path: '/home',
    exact: true,
    component: Home,
  },
  {
    path: '/web/code/:id',
    exact: true,
    component: CodeIndex,
  },
  {
    path: '/sys/standard',
    exact: true,
    component: StandardIndex,
    breadcrumbName: '标准名称维护',
  },
  {
    path: '/sys/intro',
    exact: true,
    component: MobileSettings,
    breadcrumbName: '如何链接手机',
  },
  {
    path: "/sys/userManage",
    exact: true,
    component: UserManage,
    breadcrumbName: "用户管理",
  },
  {
    path: '/mobile/record/detail/:id',
    component: RecordDetail,
  },
  { path: '/mobile/record/:id', component: RecordIndex, exact: true },
  { path: "/login", component: Login },

  { path: '*', component: NotFound },

  { path: '/web', breadcrumbName: '网站数据' },
  { path: '/mobile', breadcrumbName: '手机数据' },
  { path: '/sys', breadcrumbName: '系统设置' },
  { path: '/mobile/record', breadcrumbName: '巡检记录' },
  { path: '/mobile/record/cg', breadcrumbName: '常规井检查' },
  { path: '/mobile/record/yl', breadcrumbName: '一类井检查' },
  { path: '/mobile/record/detail', breadcrumbName: '详情' },
  { path: '/web/code', breadcrumbName: '系统代码标定' },
  { path: '/web/code/1', breadcrumbName: '水上' },
  { path: '/web/code/2', breadcrumbName: '水下(浮式)' },

];
