import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
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

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full rounded-2xl border border-white/10 bg-[#07111F] px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]/20 transition-all ' +
                className
            }
            ref={localRef}
        />
    );
});
