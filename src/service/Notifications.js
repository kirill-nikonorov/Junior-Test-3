import {notification, Button} from 'antd';
import React from 'react';

const showNotification = (config, type = 'info') => {
    const defaultConfig = {
        duration: 4,
        placement: 'bottomLeft'
    };
    notification[type]({...defaultConfig, ...config});
};

export const showErrorNotification = (message = '', data) => {
    let problems = [];
    if (!(data instanceof Object) || Array.isArray(data)) problems = data;
    else {
        Object.keys(data).forEach(prop => {
            problems.push(`${prop} : ${data[prop]} \n`);
        });
    }
    showNotification(
        {
            message,
            description: problems
        },
        'error'
    );
};
export const showSuccessNotification = message => {
    showNotification({message}, 'success');
};
export const showInfoNotificationWithButton = (message, onClick) => {
    const key = `open${Date.now()}`,
        actAndClose = () => {
            onClick();
            notification.close(key);
        },
        btn = (
            <Button type="primary" size="small" onClick={actAndClose}>
                Вернуть
            </Button>
        ),
        config = {
            message: message,
            btn,
            key
        };
    showNotification(config);
};
