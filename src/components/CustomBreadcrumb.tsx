import React, {FC, useMemo} from "react";
import {Link, useLocation} from 'react-router-dom';
import {Breadcrumb} from 'antd';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {routesConfigs} from "../routes.config";
import {Dict} from "../store/dict/types";

type Props = {
  buttons?: JSX.Element
}

const CustomBreadcrumb: FC<Props> = ({buttons}) => {
  const rootMenu = useSelector((state: RootState) => state.main.rootMenu);
  let location = useLocation();

  //是否显示动态子菜单
  let useDynamicMenus = true;
  const menus = useSelector((state: RootState) => state.dict.menus);


  return useMemo(() => {
    const breadcrumbNameMap: any = {};
    routesConfigs.forEach(r => {
      if (r.breadcrumbName) {
        breadcrumbNameMap[r.path] = r.breadcrumbName;
      }
    })

    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

      //显示动态子菜单
      let last: JSX.Element = <span key={url}>{breadcrumbNameMap[url]}</span>;
      if (useDynamicMenus) {
        if (/\d+/g.test(pathSnippets[1])) {

          let filteredMenu = menus.filter(m => m.ID + '' === pathSnippets[0]);
          let types: Dict[] = [];
          if (filteredMenu[0]) {
            types = filteredMenu[0].children.filter(m => m.ID + '' === pathSnippets[1]);
          } else {
            types = [];
          }
          let type = '';
          if (types[0]) {
            type = types[0].Title;
          }
          last = <span key={url}>{type}</span>;
        }
      }
      return (
        <Breadcrumb.Item key={url}>
          {index === 0 ? (
            (!useDynamicMenus && <Link to={url}>{breadcrumbNameMap[url]}</Link>) ||
            (useDynamicMenus && <span key={url}>{breadcrumbNameMap[url]}</span>)
          ) : last}
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <span>{rootMenu}</span>
      </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems);

    return (
      <div className="breadcrumb">
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        {buttons}
      </div>
    );
    // eslint-disable-next-line
  }, [location.pathname, buttons])
}

export default CustomBreadcrumb;