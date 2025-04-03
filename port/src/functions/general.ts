const throttle = <T extends (...args: any[]) => void>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void => {
    let lastRan = 0; // Час останнього виклику
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function (this: unknown, ...args: Parameters<T>): void {
        const now = Date.now();
        const context = this;

        if (now - lastRan >= limit) {
            // Викликаємо функцію одразу, якщо пройшов час
            func.apply(context, args);
            lastRan = now;
        } else {
            // Встановлюємо таймер на залишок часу
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                func.apply(context, args);
                lastRan = Date.now();
            }, limit - (now - lastRan));
        }
    };
};

export default throttle;
