//@flow

import axios from 'axios';

export class Artist {
    artist_id: number;
    artist_name: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

class ArtistService {
    getAllArtists(): Artist[] {
        return axios.get<Artist[]>(`http://localhost:4000/api/artist`).then(response => response.data);
    }

    getArtistById(artistId: number): Artist {
        return axios.get<Artist>(`http://localhost:4000/api/artist/${artistId}`).then(response => response.data);
    }
}

export let artistService = new ArtistService();

