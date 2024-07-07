self.onmessage = function (event) {
    var numbers = event.data.numbers;
    if (!numbers) {
        console.error('No numbers array provided');
        return;
    }
    var results = numbers.map(Math.sqrt);
    // Send result back to the main thread
    self.postMessage({ results: results });
};