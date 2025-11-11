type Props = {
  className?: string;
  ariaLabel?: string;
};

export default function Logo({ className, ariaLabel }: Props) {
  return (
    <svg
      className={className}
      width="94"
      height="47"
      viewBox="0 0 94 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={ariaLabel ? "img" : "presentation"}
      aria-label={ariaLabel}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M93.6278 10.8632L52.9626 0L61.7474 24.0589L70.0564 46.812L75.2633 44.9213L71.0534 33.3823L93.6344 10.8697L93.6278 10.8632ZM68.955 27.6519L68.1665 25.4818L66.0746 19.7513L61.8191 8.08895L82.9272 13.7285L68.9615 27.6519H68.955Z"
        fill="currentColor"
      />
      <path
        d="M63.4874 30.1328L46.7586 46.811L42.842 42.9062L30.1406 30.2433L32.2325 24.5128L46.7586 38.9949L61.3955 24.4023L63.4874 30.1328Z"
        fill="currentColor"
      />
      <path
        d="M40.7108 0L23.6236 46.812L0 23.2598L21.3883 36.7674L31.8609 8.08895L0 16.5937V10.8762L40.7108 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
