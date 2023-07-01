import { useState } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from "../../app/services/employees";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import Layout from "../../components/layout";
import { Descriptions, Divider, Modal, Space } from "antd";
import Cbutton from "../../components/cbutton";
import { DeleteOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import ErrorMessage from "../../components/error-message";
import { Paths } from "../../paths";
import { isErrorMessage } from "../../utils/is-error-message";

const Employee = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const params = useParams<{id: string}>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [removeEmployee] = useRemoveEmployeeMutation();
    const { data, isLoading } = useGetEmployeeQuery(params.id || "");
    const user = useSelector(selectUser);

    if (isLoading) {
        return <LoadingOutlined size={70}/>
    }

    if (!data) {
        return <Navigate to="/" />
    }

    const handleDeleteUser = async () => {
        setIsModalOpen(false);

        try {
            await removeEmployee(data.id).unwrap();

            navigate(`${Paths.status}/deleted`)
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
            <Descriptions title="Информация о сотруднике" bordered>
                <Descriptions.Item label="Имя" span={3}>
                    {`${data.firstName} ${data.lastName}`}
                </Descriptions.Item>
                <Descriptions.Item label="Возраст" span={3}>
                    {data.age}
                </Descriptions.Item>
                <Descriptions.Item label="Адрес" span={3}>
                    {data.address}
                </Descriptions.Item>
            </Descriptions>
            {
                user?.id === data.userId && (
                    <>
                        <Divider orientation="left">Действия</Divider>
                        <Space>
                            <Link to={`/employee/edit/${data.id}`}>
                                <Cbutton shape="round" type="default" icon={<EditOutlined />}>
                                    Редактировать
                                </Cbutton>
                            </Link>
                            <Cbutton shape="round" danger onClick={() => setIsModalOpen(true)} icon={<DeleteOutlined />}>
                                Удалить
                            </Cbutton>
                        </Space>
                    </>
                )
            }
            <ErrorMessage message={error}/>
            <Modal
                title="Подтвердите действие"
                open={isModalOpen}
                onOk={handleDeleteUser}
                onCancel={() => setIsModalOpen(false)}
                okText="Подтвердить"
                cancelText="Отменить"
            >
                Вы действительно хотите удалить этого сотрудника?
            </Modal>
        </Layout>
    )
};

export default Employee;
