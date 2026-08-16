import axios from 'axios'
import { apiToken } from '../authService/externalVariables'
import type { MovieResponse } from '../types/movieTypes'

const getMovies = async (year: number, language: string) => {

    try {
        const config = {
            method: 'GET', 
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
               language: 'en-US',
               page: 1,
               sort_by: 'popularity.desc',
               with_original_language: language,
               primary_release_year: year,
               api_key: apiToken
            },
            headers: {
                accept: 'application/json'
            }
        }

        const { data: movies } = await axios<MovieResponse>(config)
        console.log('see the movies from the call: ', movies)

        return movies

    } catch (error) {
        console.error('Error retrieving movies.', error)
        throw error
    }
}


export default getMovies