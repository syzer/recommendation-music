const request = require('request')
const fs = require('fs')
const Task = require('data.task')
const Either = require('data.either')

// its like promise but pure
const httpGet = url =>
    new Task((rej, res) =>
        request({ url, json: true }, (error, resp, body) =>
            error ? rej(error) : res(body)))

// Either => Task
const eitherToTask = e => e.fold(Task.rejected, Task.of)

// fromNullable is either
const first = xs => Either.fromNullable(xs[0])

const parseJSON = Either.try(JSON.parse)

const getArtist = name =>
    httpGet(`https://api.spotify.com/v1/search?q=${name}&type=artist`)
        .map(data => data.artists.items)
        .map(first)
        .chain(eitherToTask)

const relatedArtists = artistId =>
    httpGet(`https://api.spotify.com/v1/artists/${artistId}/related-artists`)
        .map(data => data.artists)

module.exports = {
    getArtist,
    relatedArtists
}
