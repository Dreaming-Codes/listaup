/* Liner Interpolation
 * lerp(min, max, ratio)
 * eg,
 * lerp(20, 60, .5)) = 40
 * lerp(-20, 60, .5)) = 20
 * lerp(20, 60, .75)) = 50
 * lerp(-20, -10, .1)) = -.19
 */
export function lerp(x: number, y: number, a: number): number {
    return (1 - a) * x + a * y
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(scrollPercent: number, start: number, end: number) {
    return (scrollPercent - start) / (end - start)
}

interface lazyResult {
    args: any[],
    value: any
}

const lazyCache: Map<Function, lazyResult> = new Map();

export function lazyCall<T>(fn: (...args: any[]) => T, ...args: any[]): T {
    if (lazyCache.has(fn) && lazyCache.get(fn)!.args.every((arg, i) => arg === args[i])) {
        return lazyCache.get(fn)!.value;
    }

    let result = fn(...args);
    lazyCache.set(fn, {args, value: result});
    return result;
}
