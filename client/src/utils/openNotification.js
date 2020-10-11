import {notification} from "antd";

export const openNotificationWithIcon = (type, message) => {
    if (type === 'error') {
        notification[type]({
            message: 'Error!',
            description:
                'Something is wrong... see at console',
        });
    }

    if (type === 'success') {
        notification[type]({
            message: 'Excellent!',
            description:
                'Everything went well.',
        });
    }
    if (type === 'warning') {
        notification[type]({
            message: message,
        });
    }
};