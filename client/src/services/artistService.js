//@flow

import axios from 'axios';
import {userService} from "./userService";

export class Artist {
    artist_id: number;
    artist_name: string;
    contact_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    user_id: string;
}

class ArtistService {
    getAllArtists(): Artist[] {
        return axios.get<Artist[]>(`http://localhost:4000/api/artist`).then(response => response.data);
    }

    getArtistById(artistId: number): Artist {
        return axios.get<Artist>(`http://localhost:4000/api/artist/${artistId}`).then(response => response.data);
    }

    getArtistByContactId(contactId: number): Artist {
        return axios.get<Artist>(`http://localhost:4000/auth/${userService.getUserID()}/user/contact/${contactId}/artist`).then(response => response.data);
    }

    getArtistByEvent(eventId: number): Artist[] {
        return axios.get<Artist[]>(`http://localhost:4000/api/event/${eventId}/artist`).then(response => response.data);
    }

    addArtistToEvent(artist: Artist, documentId: number, eventId): void {
        return axios.post(`http://localhost:4000/api/event/${eventId}/artist`, {artist_name: artist.artist_name,
                                                                                  first_name: artist.first_name,
                                                                                  last_name: artist.last_name,
                                                                                  email: artist.email,
                                                                                  phone: artist.phone,
                                                                                  document_id: documentId})
            .then(response => response.data);
    }

    removeArtistFromEvent(eventId: number, artistId: number): void {
        return axios.delete(`http://localhost:4000/api/event/${eventId}/artist/${artistId}`).then(response => response.data);
    }

    getArtistByUser(userId: number): Artist[] {
        return axios.get<Artist[]>(`http://localhost:4000/api/artist/user/${userId}`).then(response => response.data);
    }
}

export let artistService = new ArtistService();

