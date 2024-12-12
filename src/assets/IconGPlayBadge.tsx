import { IconType } from '@/types/icon.types';

export const IconGPlayBadge: React.FC<IconType> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="30px" viewBox="0 0 100 30">
      <rect width="100" height="30" fill="#000" rx="5" />
      <g transform="translate(10, 6)">
        <path
          d="M5 3.3c0-1.2-.9-2.3-2.1-2.3H1V9.2h1.9c1.2 0 2.1-1 2.1-2.3V3.3zm-1.3 3.7c0 .7-.4 1.2-1.2 1.2H2.1V2.2H3c.8 0 1.2.5 1.2 1.2v3.6z"
          fill="#fff"
        />
        <path
          d="M6.5 6.7c.6.4 1.4.6 2.1.6 1.6 0 2.5-1 2.5-2.5v-3h-1.2v3c0 .8-.5 1.3-1.3 1.3-.5 0-.9-.1-1.2-.4l-.9.9z"
          fill="#fff"
        />
        <path
          d="M13.5 4.5c.4-.3.6-.8.6-1.4 0-.6-.2-1.1-.6-1.4-.4-.3-.9-.5-1.4-.5H11v5.8h1.1c.5 0 1-.2 1.4-.5zm-2.4-2.8h.9c.5 0 .9.4.9.9s-.4.9-.9.9h-.9V1.7zm1 3.3h-.9v-1h.9c.5 0 .9.4.9 1s-.4.9-.9.9z"
          fill="#fff"
        />
        <path
          d="M18.6 6.3l-.8-.9c-.2.2-.4.3-.7.3-.3 0-.5-.1-.6-.3-.2-.2-.2-.5-.2-.8V3.7H18V2.5h-1.7v-1h-1.2v1H13v1.2h1.2v1c0 .7.2 1.2.6 1.6.4.4 1 .6 1.6.6.5 0 .9-.1 1.3-.4z"
          fill="#fff"
        />
      </g>
      <text x="32" y="18" font-family="Arial, sans-serif" font-size="9" fill="#fff">
        Get it on
      </text>
      <text x="32" y="26" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#fff">
        Google Play
      </text>
    </svg>
  );
};
