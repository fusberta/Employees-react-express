import { useState } from "react";
import Layout from "../../components/layout";
import { Card, Form, Row, Space, Typography } from "antd";
import Cinpit from "../../components/cinput";
import CpasswordInput from "../../components/cpassword-input";
import Cbutton from "../../components/cbutton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import { isErrorMessage } from "../../utils/is-error-message";
import ErrorMessage from "../../components/error-message";

type RegisterData = Omit<User, "id"> & { confirmPassword: string }

const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState('');
  const [registerUser] = useRegisterMutation();

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();

      navigate('/')
    }
    catch (err) {
      const maybeeError = isErrorMessage(err);

      if (maybeeError) {
        setError(err.data.message);
      } else {
        setError('Неизвестная ошибка')
      }
    }
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Регистрация" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <Cinpit name="name" placeholder="Имя" />
            <Cinpit type="email" name="email" placeholder="Email" />
            <CpasswordInput name="password" placeholder="Пароль" />
            <CpasswordInput name="confirmPassword" placeholder="Подтвердите пароль" />
            <Cbutton
              type="primary"
              htmlType="submit"
            >
              Зарегистрироваться
            </Cbutton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Уже зарегистрированы? <Link to={Paths.login}>Войдите в аккаунт</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
};

export default Register;
