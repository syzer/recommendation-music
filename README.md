# WAT

Recommendation engine using spotify db

Inspired by FP workshop.

Required:

FP programming with [fantasy-land](https://github.com/fantasyland/fantasy-land)

# How
```
npm i 
npm start
```
or 
```
node index artist1 artist2
```

# Usage

Lets say we want know user likes 'ZZ Top' and 'acdc' bands,
and we want to recommend some new bands that user might not know:
```
node index 'ZZ Top' acdc
=> [ 'Deep Purple', 'Thin Lizzy', 'Van Halen', 'Alice Cooper' ]
```

please note that transform
```
node index  acdc 'ZZ Top'
=>[ 'Alice Cooper', 'Deep Purple', 'Van Halen', 'Thin Lizzy' ]
```
is isomorphic

also its idempotent (always return same set)


# Example 2

if we want

# Example Spotify API

```bash
curl -X GET "https://api.spotify.com/v1/search?q=Muse&type=artist" -H "Accept: application/json"
https://api.spotify.com/v1/search?query=Muse&offset=0&limit=20&type=artist
```
