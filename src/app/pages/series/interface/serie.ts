export interface Serie {
    Title: 'Title',
    Year: 'Year',
    Rated: 'Rated',
    Released: 'Released',
    Runtime: 'Runtime',
    Genre: 'Genre',
    Director: 'Director',
    Writer: 'Writer',
    Actors: 'Actors',
    Plot: 'Plot',
    Language: 'Language',
    Awards: 'Awards',
    Poster: 'Poster',
    imdbRating: 'imdbRating'
    Type: 'Type',
    totalSeasons: 'totalSeasons',
    Response: 'Response'
}

export interface Episodes {
    Season: 'Season',
    totalSeasons: 'totalSeasons',
    Episodes: {
        Title: 'Title',
        Released: 'Released',
        Episode: 'Episode',
        imdbRating: 'imdbRating',
        imdbID: 'imdbID'
    },
    Response: 'Response'
}

export interface Episode {
    Title: 'Title',
    Year: 'Year',
    Rated: 'Rated',
    Released: 'Released',
    Season: 'Season',
    Episode: 'Episode',
    Runtime: 'Runtime',
    Genre: 'Genre',
    Director: 'Director',
    Writer: 'Writer',
    Actors: 'Actors',
    Plot: 'Plot',
    Language: 'Language',
    Country: 'Country',
    Awards: 'Awards',
    Poster: 'Poster',
    imdbRating: 'imdbRating'
    Type: 'Type',    
    Response: 'Response'
}
