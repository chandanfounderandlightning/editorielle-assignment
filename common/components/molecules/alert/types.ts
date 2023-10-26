export type AlertType = 'success' | 'error';

export type AlertProps = {
    show: boolean;
    type: AlertType;
    title?: string;
    content: string;
};
