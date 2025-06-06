type Debouncer = <T extends (...args: any[]) => void>(
    func: T,
    wait: number,
    immediate?: boolean
) => (...args: Parameters<T>) => void;

/**
 * Creates a debounced version of a function. The debounced function delays execution
 * until after a specified amount of time has passed since the last invocation.
 * It ensures that the function is only called once after the user has stopped triggering the event.
 * Optionally, the function can be executed immediately on the first call.
 * 
 * @param func - The function that should be debounced (delayed).
 * @param wait - The time in milliseconds to wait after the last event before invoking the function.
 * @param immediate - If true, the function will be invoked immediately on the first call.
 * @returns A debounced function that delays execution and only runs after the wait time has passed since the last invocation.
 */
export const debounce: Debouncer = (func, wait, immediate = false) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function (this: ThisParameterType<typeof func>, ...args: any[]) {
        const context = this;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout as ReturnType<typeof setTimeout>);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};



type Throttler = <T extends (...args: any[]) => void>(
    func: T,
    limit: number
) => (...args: Parameters<T>) => void;

/**
 * Creates a throttled version of a function. The throttled function ensures that the function
 * is called at most once every specified interval of time. If the function is triggered again
 * before the interval has passed, it will not be executed until the interval has elapsed.
 * 
 * @param func - The function that should be throttled (called at a fixed rate).
 * @param limit - The minimum time interval (in milliseconds) between consecutive invocations of the function.
 * @returns A throttled function that ensures the function is only invoked at most once every `limit` milliseconds.
 */
export const throttle: Throttler = (func, limit) => {
    let lastCall = 0;
    let scheduledCall: number | null = null;

    return function (this: ThisParameterType<typeof func>, ...args: any[]) {
        const now = performance.now();
        const elapsed = now - lastCall;

        if (elapsed > limit) {
            if (scheduledCall !== null) {
                window.clearTimeout(scheduledCall);
                scheduledCall = null;
            }
            lastCall = now;
            func.apply(this, args);
        } else if (scheduledCall === null) {
            scheduledCall = window.setTimeout(() => {
                scheduledCall = null;
                lastCall = now;
                func.apply(this, args);
            }, limit - elapsed);
        }
    };
};