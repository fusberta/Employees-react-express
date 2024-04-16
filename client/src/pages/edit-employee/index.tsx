import { useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEditEmployeeMutation, useGetEmployeeQuery } from "../../app/services/employees";
import { Row } from "antd";
import EmployeeForm from "../../components/employee-form";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorMessage } from "../../utils/is-error-message";
import Layout from "../../components/layout";
import { LoadingOutlined } from "@ant-design/icons";

const EditEmployee = () => {

    const navigate = useNavigate();
    const params = useParams<{ id: string }>()
    const [error, setError] = useState('');
    const { data, isLoading } = useGetEmployeeQuery(params.id || '');
    const [editEmployee] = useEditEmployeeMutation();

    if (isLoading) {
        return <LoadingOutlined size={70}/>
    }

    if (!data) {
        return <Navigate to="/" />
    }

    const handleEditUser = async (employee: Employee) => {
        try {
            const editedEmployee = {
                ...data,
                ...employee
            }

            await editEmployee(editedEmployee).unwrap();
            navigate(`${Paths.status}/created`)
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
                <EmployeeForm 
                    title="Редактировать сотрудника"
                    btnText="Редактировать"
                    error={error}
                    employee={data}
                    onFinish={handleEditUser}
                />
            </Row>
        </Layout>
    )
};

export default EditEmployee;
