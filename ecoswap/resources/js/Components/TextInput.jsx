import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    // Detect if current route is part of dashboard to use light styles there
    let isDashboard = false;
    try {
        const current = route().current();
        isDashboard =
            current && current.startsWith && current.startsWith("dashboard");
    } catch (e) {
        // route may be undefined in some environments; ignore
    }

    // Use light input (white background, dark text) for dashboard searches
    const baseClasses = isDashboard
        ? "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 transition-all "
        : "w-full rounded-2xl border border-white/10 bg-[#07111F] px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]/20 transition-all ";

    return (
        <input
            {...props}
            type={type}
            className={baseClasses + className}
            ref={localRef}
        />
    );
});
