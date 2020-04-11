const fetchY = () =>
    new Promise(resolve => setTimeout(() => resolve(7), 200));

const fetchX = () =>
    new Promise(resolve => setTimeout(() => resolve(5), 300));

const add = (...promises) => Promise.all(promises);

add(fetchX(), fetchY())
    .then(values => values.reduce((a, b) => a + b))
    .then(console.log)
    .catch(console.error);


if (!Promise.first) {
    Promise.first = promises =>
        new Promise(resolve => {
            promises.forEach(promise => Promise.resolve(promise).then(resolve))
        });
}

if (!Promise.betterAll) {
    Promise.betterAll = promises =>
        Promise.all(promises.map(p => Promise
            .resolve(p)
            .then(f => f)
            .catch(() => null)
        ))
}

Promise.betterAll([
   Promise.resolve('aaa'),
   Promise.resolve('bbb'),
   Promise.resolve('ccc'),
   Promise.reject('555')
]).then(console.log);
