import { Form, Input } from "antd";

type props = {
    name: string;
    placeholder: string;
    type?: string;
}

const Cinpit = ({ name, placeholder, type = 'text' } : props) => {
  return (
    <Form.Item
        name={name}
        shouldUpdate={true}
        rules={[{ required: true, message: 'Обязательное поле'}]}
    >
        <Input
            placeholder={placeholder}
            type={type}
            size="large"
        >
        
        </Input>
    </Form.Item>
  )
};

export default Cinpit;
