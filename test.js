import test from 'ava'
import main from './usingImmutable'

test('using immutable', t => {
    main(['acdc','ZZ Top', 'Deep Purple'])
        .fork(console.error, d => {
            console.error('d', d)
            t.fail()
            // t.deepEqual([1, 2], [1, 2])
        })
})
