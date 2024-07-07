"use client"
import React from "react";

const benchmarkHandler = (numCores: number) => {
    // numCores = 1;
    const data = Array.from({ length: 50000000 }, (_, i) => i + 1);
    const chunkSize = Math.ceil(data.length / numCores);
    const chunks = Array.from({ length: numCores }, (_, i) => data.slice(i * chunkSize, (i + 1) * chunkSize));

    console.log('Benchmark started');
    console.time('Benchmark');

    const workers = [];
    let results: any[] = [];
    for (let i = 0; i < numCores; i++) {
        const worker = new Worker(new URL('./sqrtWorker.js', import.meta.url), { type: 'module' });
        workers.push(worker);
        worker.postMessage({ numbers: chunks[i] });
        worker.onmessage = (event) => {
            results = results.concat(event.data.results);
        };
    }

    Promise.all(workers.map(worker => new Promise((resolve) => worker.onmessage = (event) => {
        resolve(event.data.results);
        worker.terminate(); // Terminate the worker after it has finished its task
    })))
        .then(() => {
            console.timeEnd('Benchmark');
            console.log('Benchmark completed');
        });
}

export default function Bench() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            {[navigator.hardwareConcurrency].map(numCores => (
                <button key={numCores} onClick={() => benchmarkHandler(numCores)} className="p-4 m-4 bg-gray-100 dark:bg-zinc-800/30 rounded-lg">
                    Benchmark {numCores} core{numCores > 1 ? "s" : ""}
                </button>
            ))}
        </div>
    );
}