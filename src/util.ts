/**
 * Sleep for the specified amount of milliseconds.
 * @param ms The amount of milliseconds to sleep for.
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
}
