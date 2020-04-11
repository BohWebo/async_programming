class EventEmitter {
    constructor() {
        this.eventsMap = new Map();
    }

    on(name, f) {
        const events = this.eventsMap.get(name);
        if (events) events.push(f);
        else this.eventsMap.set(name, [f]);
    }

    emit(name, ...args) {
        const events = this.eventsMap.get(name);

        if (events) events.forEach(f => f(...args));
    }

    remove(name, f) {
        const events = this.eventsMap.get(name);

        if (events) {
            const i = events.indexOf(f);
            events.splice(i, 1);
        }
    }

    once(name, f) {
        const wrapF = (...args) => {
            this.remove(name, f);
            f(...args);
        };
        this.on(name, wrapF);
    }

    clear(name) {
        if (name) this.eventsMap.delete(name);
        else this.eventsMap.clear();
    }

    count(name) {
        const events = this.eventsMap.get(name);

        return events ? events.length : 0;
    }

    listeners(name) {
        const events = this.eventsMap.get(name);

        return events ? events.slice() : [];
    }

    names() {
        return [...this.eventsMap.keys()];
    }

}

const ee = new EventEmitter();


ee.on('e1', data => console.dir(data));

ee.emit('e1', { msg: 'e1 ok' });

// once

ee.once('e2', data => {
    console.dir(data);
});

ee.emit('e2', { msg: 'e2 ok' });
ee.emit('e2', { msg: 'e2 not ok' });

// remove

const f3 = data => {
    console.dir(data);
};

ee.on('e3', f3);
ee.remove('e3', f3);
ee.emit('e3', { msg: 'e3 not ok' });

// count

ee.on('e4', () => {});
ee.on('e4', () => {});
console.log('e4 count', ee.count('e4'));

// clear

ee.clear('e4');
ee.emit('e4', { msg: 'e4 not ok' });
ee.emit('e1', { msg: 'e1 ok' });

ee.clear();
ee.emit('e1', { msg: 'e1 not ok' });

// listeners and names

ee.on('e5', () => {});
ee.on('e5', () => {});
ee.on('e6', () => {});
ee.on('e7', () => {});

console.log('listeners', ee.listeners('e5'));
console.log('names', ee.names());
``
