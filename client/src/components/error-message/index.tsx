import { Alert } from "antd";

type props = {
    message?: string;
}

const ErrorMessage = ({ message }: props) => {
    if (!message) {
        return null
    }
    return <Alert message={message} type="error" />
};

export default ErrorMessage;
