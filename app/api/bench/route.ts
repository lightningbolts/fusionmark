import { Worker } from 'worker_threads';

export function GET() {
    try {
        // Create a new Worker object
        const worker = new Worker('./app/api/bench/worker.js');

        // Send data to the worker
        worker.postMessage({ numbers: [1, 2, 3, 4, 5] });

        // Listen for messages from the worker
        worker.on('message', (event: { sum: any; }) => {
            console.log('Sum:', event.sum);
        });

        return { status: 200, body: 'Success' };
    }
    catch (error) {
        console.error(error);
        return { status: 500, body: 'Internal Server Error' };
    }
}