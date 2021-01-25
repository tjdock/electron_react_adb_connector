import { Button, Card, Form, Input } from 'antd';
import React, { FC } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../store/main/types';


const Login: FC = () => {
  const dispatch = useDispatch();


  const onFinish = (values: any) => {
    //登录成功后跳转的页面
    //dispatch(login(values.username, values.password));
    dispatch({ type: LOGIN, username: values.username, password: values.password });

  }

  return (
    <>
      <div className="content">
        <div className="white-bg" style={{ padding: '20px', width: '500px', margin: '0 auto' }}>
          <Card title="登录">
            <Form
              name="basic"
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '账号不能为空' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: '密码不能为空' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
