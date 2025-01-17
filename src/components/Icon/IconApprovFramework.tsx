import { FC } from 'react';

interface IconApprovFrameworkProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconApprovFramework: FC<IconApprovFrameworkProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em" className={className}>
            <path d="M352 96c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96zM240 248v264l-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427V224c0-17.7 14.3-32 32-32h30.3c63.6 0 125.6 19.6 177.7 56zm32 264V248c52.1-36.4 114.1-56 177.7-56H480c17.7 0 32 14.3 32 32v203c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z" />
        </svg>
    );
};

export default IconApprovFramework;
