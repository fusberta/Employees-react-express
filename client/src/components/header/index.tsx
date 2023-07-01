import { Layout, Space, Typography } from 'antd'
import styles from './index.module.css'
import { LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import Cbutton from '../cbutton';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/auth/authSlice';

const Header = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogoutClick = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <Layout.Header className={styles.header}>
            <Space>
                <TeamOutlined className={styles.teamIcon} />
                <Link to={Paths.home}>
                    <Cbutton type='ghost'>
                        <Typography.Title level={1}>
                            Employees
                        </Typography.Title>
                    </Cbutton>
                </Link>
            </Space>
            {
                user ? (
                    <Cbutton
                        type='ghost'
                        icon={<LogoutOutlined />}
                        onClick={onLogoutClick}
                    >
                        Выйти
                    </Cbutton>
                ) :
                    (<Space>
                        <Link to={Paths.register}>
                            <Cbutton type='ghost' icon={<UserOutlined />}>Регистрация</Cbutton>
                        </Link>
                        <Link to={Paths.login}>
                            <Cbutton type='ghost' icon={<LoginOutlined />}>Войти</Cbutton>
                        </Link>
                    </Space>)
            }
        </Layout.Header>
    )
};

export default Header;
