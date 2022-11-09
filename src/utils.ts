/* Liner Interpolation
 * lerp(min, max, ratio)
 * eg,
 * lerp(20, 60, .5)) = 40
 * lerp(-20, 60, .5)) = 20
 * lerp(20, 60, .75)) = 50
 * lerp(-20, -10, .1)) = -.19
 */
import {exp} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

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

export class LazyEngine {
    private cache = new Map<Function, lazyResult>;

    /**
     * Lazy evaluation of a function. The function will only be evaluated once, and the result will be cached as long as args remains the same.
     * @param fn The function to evaluate lazily
     * @param args The arguments to pass to the function
     * @returns The result of the function
     */
    public lazyCall<T>(fn: (...args: any[]) => T, ...args: any[]): T {
        if (this.cache.has(fn) && this.cache.get(fn)!.args.every((arg, i) => arg === args[i])) {
            return this.cache.get(fn)!.value;
        }

        let result = fn(...args);
        this.cache.set(fn, {args, value: result});
        return result;
    }

    /**
     * Clears the cache
     */
    public clearCache() {
        this.cache.clear();
    }
}


export function delay(ms: number): Promise<void>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        }, ms)
    })
}
