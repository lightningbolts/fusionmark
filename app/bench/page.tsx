"use client";
import React from "react";


const benchmarkHandler = () => {
    console.log("Benchmarked");
}

export default function Bench() {
    benchmarkHandler();
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            Hello, World!
        </div>
    );
}