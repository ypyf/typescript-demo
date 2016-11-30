async function sleep(ms: number): Promise<number> {
    return new Promise<number>((resolve) => {
        setTimeout(resolve, ms);
    });
}

// async function fn(): Promise<number> {
//     var solution = await sleep(200);
//     return solution;
// }

sleep(1000).then(() => { console.log("Sleep is woken up "); });