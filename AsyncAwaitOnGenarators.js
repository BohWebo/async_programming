function ajax(url) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`data from ${url}`)
        }, 100)
    })
}

async function app() {
    function* gen() {
        const user = yield ajax('/users/111');
        const post = yield ajax('/posts/123');
        const a = yield '123';

        return 'finish message';
    }

    return awaiter(gen);
}

function awaiter(gen) {
    const genIt = gen();
    const res = genIt.next();

    return step(res);

    function step(iterator) {
        const promise = Promise.resolve(iterator.value);

        return promise.then(value => {
            const next = genIt.next(value);

            if (next.done) {
                return Promise.resolve(next.value)
            }

            return step(next);
        });
    }
}

const res = app();
res.then(console.log);


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator['throw'](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
