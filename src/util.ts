/**
 * Sleep for the specified amount of milliseconds.
 * @param ms The amount of milliseconds to sleep for.
 */
export async function sleep(ms: number): Promise<void> {
    return new Promise<void>(r => setTimeout(r, ms));
}
