import React from 'react';
import Login from './pages/Login';

//404
const NotFound = React.lazy(() => {
  return import('./pages/404');
});


interface RouteConfig {
  path: string;
  component?: React.FC;
  exact?: boolean;
  breadcrumbName?: string;
}

export const routesConfigs: Array<RouteConfig> = [


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
