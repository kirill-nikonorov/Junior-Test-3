import {schema} from 'normalizr';

const movieSchema = new schema.Entity(
    'movies',
    {},
    {
        processStrategy: entity => {
            const {genres} = entity;
            if (!genres) return entity;
            entity.genreIds = genres.map(({id}) => id);
            return entity;
        }
    }
);
const genreSchema = new schema.Entity('genres', {});

export const Schemas = {
    MOVIE: movieSchema,
    MOVIE_ARRAY: [movieSchema],
    GENRES: [genreSchema]
};
