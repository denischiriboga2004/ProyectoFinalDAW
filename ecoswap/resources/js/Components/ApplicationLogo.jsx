export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
        >
            <defs>
                <linearGradient id="EcoSwapLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00C896" />
                    <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
            </defs>
            <rect width="64" height="64" rx="18" fill="url(#EcoSwapLogoGradient)" />
            <path
                d="M44 19H20a4 4 0 00-4 4v18a4 4 0 004 4h24a4 4 0 004-4V23a4 4 0 00-4-4z"
                fill="#fff"
                opacity="0.2"
            />
            <path
                d="M42 25H22a2 2 0 00-2 2v14a2 2 0 002 2h20a2 2 0 002-2V27a2 2 0 00-2-2zm-14 4h8v2h-8v-2zm0 6h8v2h-8v-2z"
                fill="#ffffff"
            />
            <path
                d="M28.5 17.5c0-1.38 1.12-2.5 2.5-2.5h2a2.5 2.5 0 012.5 2.5v3.5h-7v-3.5z"
                fill="#ffffff"
                opacity="0.8"
            />
        </svg>
    );
}
