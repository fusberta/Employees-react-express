import Layout from "../../components/layout";
import { Card, Form, Row, Space, Typography } from "antd";
import Cinpit from "../../components/cinput";
import CpasswordInput from "../../components/cpassword-input";
import Cbutton from "../../components/cbutton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { UserData, useLoginMutation } from "../../app/services/auth";
import { isErrorMessage } from "../../utils/is-error-message";
import { useState } from 'react';
import ErrorMessage from "../../components/error-message";

const Login = () => {

  const navigate = useNavigate();

  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState('');

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();

      navigate("/");
    }
    catch (err) {
      const maybeError = isErrorMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError('Неизвестная ошибка');
      }
    }
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Вход" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <Cinpit type="email" name="email" placeholder="Email" />
            <CpasswordInput name="password" placeholder="Пароль" />
            <Cbutton
              type="primary"
              htmlType="submit"
            >
              Войти
            </Cbutton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={ Paths.register }>Создать аккаунт</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
};

export default Login;
