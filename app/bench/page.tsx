"use client";
import React from "react";

const benchmarkHandler = (numCores: number) => {
    // Use /api/bench to benchmark the server
    fetch(`/api/bench?numCores=${numCores}`, { method: 'GET' })
        .then(res => res.json())
        .then(data => console.log(data));
}

export default function Bench() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            {[1, 2, 3, 4].map(numCores => (
                <button key={numCores} onClick={() => benchmarkHandler(numCores)} className="p-4 m-4 bg-gray-100 dark:bg-zinc-800/30 rounded-lg">
                    Benchmark {numCores} core{numCores > 1 ? "s" : ""}
                </button>
            ))}
        </div>
    );
}