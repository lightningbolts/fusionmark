import { Worker } from 'worker_threads';
import path from 'path';

export function GET(req: any) {

    try {
        const numCores = 1
        const data = Array.from({ length: 100_000_000 }, (_, i) => i + 1);
        const chunkSize = Math.ceil(data.length / numCores);
        const chunks = Array.from({ length: numCores }, (_, i) => data.slice(i * chunkSize, (i + 1) * chunkSize));

        console.log('Benchmark started');
        console.time('Benchmark');

        const workers = [];
        let results: any[] = [];
        for (let i = 0; i < numCores; i++) {
            const workerFilePath = path.resolve(__dirname, './worker.js');
            const worker = new Worker(workerFilePath, { workerData: chunks[i] });
            workers.push(worker);
            worker.on('message', (message) => {
                results = results.concat(message);
            });
        }

        Promise.all(workers.map(worker => new Promise((resolve) => worker.on('exit', resolve))))
            .then(() => {
                console.timeEnd('Benchmark');
                console.log('Benchmark completed');
            });

        return new Response('Benchmark started', { status: 200 });
    }
    catch (error) {
        console.error(error);
        return new Response('Failed to start benchmark', { status: 500 });
    }
}