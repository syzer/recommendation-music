#!/usr/bin/env node

// how about we want 3 artists
// lets use immutable Lists

const Task = require('data.task')
const { getArtist, relatedArtists } = require('./db')
const { List } = require('immutable-ext')
const { Pair, Sum } = require('./monoids')

// like promise, but applicative functor
const argv = new Task((rej, res) => res(process.argv))
const artistNames = argv.map(args => args.slice(2))

// AKA intersection
// AKA semigroup
const xor = xs => ({
    xs,
    concat: ({ xs: ys }) =>
        xor(xs.filter(x => ys.some(y => x === y)))
})

const relatedArtist = artistName =>
    getArtist(artistName)
        .map(artist => artist.id)
        .chain(relatedArtists)
        // two lists of artists, combine them with semigroup AKA set intersection
        .map(artists => artists.map(artist => artist.name))

const artistIntersection = relateds =>
    relateds.foldMap(x => Pair(xor(x), Sum(x.length)))
    // Pair is bifunctor, so we can run map twice
        .bimap(x => x.xs, y => y.x)
        .toList()

const main = artistNames =>
    List(artistNames)
        .traverse(Task.of, relatedArtist)
        .map(artistIntersection)

// fork is for side effects
artistNames
    .chain(main)
    .fork(console.error, console.log)

module.exports = main
