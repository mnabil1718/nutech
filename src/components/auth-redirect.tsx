import { Link } from "react-router";

interface AuthRedirectProps {
    message: string;
    linkText: string;
    href: string;
    className?: string;
}

export function AuthRedirect({ message, linkText, href, className = "" }: AuthRedirectProps) {
    return (
        <p className={className}>
            {message}{" "}
            <Link
                to={href}
                className="underline text-primary hover:opacity-80 transition-opacity"
            >
                {linkText}
            </Link>
        </p>
    );
}
