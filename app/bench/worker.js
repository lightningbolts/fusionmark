self.onmessage = function (event) {
    var numbers = event.data.numbers;
    if (!numbers) {
        console.error('No numbers array provided');
        return;
    }
    var sum = numbers.reduce(function (a, b) { return a + b; }, 0);
    // Send result back to the main thread
    self.postMessage({ sum: sum });
};