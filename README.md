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

# Example Spotify API

```bash
curl -X GET "https://api.spotify.com/v1/search?q=Muse&type=artist" -H "Accept: application/json"
https://api.spotify.com/v1/search?query=Muse&offset=0&limit=20&type=artist
```
