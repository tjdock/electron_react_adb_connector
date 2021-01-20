import { DictActionTypes, DictState } from './types';
import {
  SettingOutlined,
  AntCloudOutlined,
  MobileOutlined,
} from '@ant-design/icons';

const initialState: DictState = {
  menus: [
    {
      Title: '系统代码标定',
      ID: 'web',
      children: [{ Title: '水上', ID: 'code/1' }, { Title: '水下(浮式)', ID: 'code/2' }],
      icon: AntCloudOutlined,
    },
    {
      Title: '手机数据',
      ID: 'mobile',
      children: [
        { Title: '常规井检查', ID: 'record/cg' },
        { Title: '一类井检查', ID: 'record/yl' },
      ],
      icon: MobileOutlined,
    },
    {
      Title: '系统设置',
      ID: 'sys',
      children: [
        { Title: "用户管理", ID: "userManage" },
        { Title: '标准名称维护', ID: 'standard' },
        { Title: '如何链接手机', ID: 'intro' },
      ],
      icon: SettingOutlined,
    },
  ],
};

export function dictReducer(
  state = initialState,
  action: DictActionTypes
): DictState {
  switch (action.type) {
    default:
      return state;
  }
}
