import test from 'ava'
import main from './usingImmutable'

test('using immutable', async t =>
    await main(['acdc','ZZ Top', 'Deep Purple'])
        .fork(console.error, d => {
            console.error('d', d)
            // t.pass();
            t.fail()
            // t.deepEqual([1, 2], [1, 2])
        }))
