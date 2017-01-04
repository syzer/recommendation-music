#!/usr/bin/env node

const Task = require('data.task')
const { getArtist, relatedArtists } = require('./db')

// like promise, but applicative functor
const argv = new Task((rej, res) => res(process.argv))
const artistNames = argv.map(args => args.slice(2))

// AKA intersection
const xor = xs => ({
    xs,
    concat: ({xs: ys}) =>
        xor(xs.filter(x => ys.some(y => x === y)))
})

const relatedArtist = artistName =>
    getArtist(artistName)
        .map(artist => artist.id)
        .chain(relatedArtists)
        // two lists of artists, combine them with semigroup AKA set intersection
        .map(artists => artists.map(artist => artist.name))

const artistIntersection = relatedArtist1 => relatedArtist2 =>
    xor(relatedArtist1).concat(xor(relatedArtist2)).xs

const main = ([artist1, artist2]) =>
    Task.of(artistIntersection)
        .ap(relatedArtist(artist1))
        .ap(relatedArtist(artist2))

// fork is for side effects
artistNames
    .chain(main)
    .fork(console.error, console.log)
