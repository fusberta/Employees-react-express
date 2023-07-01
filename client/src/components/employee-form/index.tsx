import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import Cinpit from "../cinput";
import ErrorMessage from "../error-message";
import Cbutton from "../cbutton";

type props<T> = {
    onFinish: (values: T) => void;
    btnText: string;
    title: string;
    error?: string;
    employee?: T;
}

export const EmployeeForm = ({
    onFinish,
    title,
    employee,
    btnText,
    error,
  }: props<Employee>) => {
    return (
        <Card title={title} style={{ width: '30rem' }}>
            <Form name="employee-form" onFinish={onFinish} initialValues={employee}>

                <Cinpit type="text" name="firstName" placeholder="Имя сотрудника" />
                <Cinpit name="lastName" placeholder="Фамилия сотрудника" />
                <Cinpit type="text" name="age" placeholder="Возраст" />
                <Cinpit name="address" placeholder="Адрес" />

                <Cbutton type="primary" htmlType="submit">
                    {btnText}
                </Cbutton>
                <ErrorMessage message={error} />

            </Form>
        </Card>
    )
};

export default EmployeeForm;
