export const startTime = performance.now();

while (performance.now() - startTime < 1000) {
  // Do nothing for 500 ms to emulate extremely slow code
}
