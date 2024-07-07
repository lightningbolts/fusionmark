const { parentPort } = require('worker_threads');

parentPort.on('message', function (data) {
    var numbers = data.numbers;
    var sum = numbers.reduce(function (a, b) { return a + b; }, 0);
    // Send result back to the main thread
    parentPort.postMessage({ sum: sum });
});