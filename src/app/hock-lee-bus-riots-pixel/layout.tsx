import { Suspense, type ReactNode } from "react";

export default function HockLeeLayout({ children }: { children: ReactNode }) {
    return <Suspense>{children}</Suspense>;
}
