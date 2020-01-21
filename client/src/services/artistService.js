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
        return axios.get<Artist[]>(`http://localhost:4000/api/artist`, {
            'headers': {
                'x-access-token': userService.getToken()
            }})
            .then(response => {
                if(userService.error(response)){
                    return userService.error(response);
                }
                return response.data;
            })
            .catch(error => console.log("error" + error));
    }

    getArtistById(artistId: number): Artist {
        return axios.get<Artist>(`http://localhost:4000/api/artist/${artistId}`, {
            'headers': {
                'x-access-token': userService.getToken()
            }})
            .then(response => {
                if(userService.error(response)){
                    return userService.error(response);
                }
                return response.data;
            })
            .catch(error => console.log("error" + error));
    }

    getArtistByContactId(contactId: number): Artist {
        return axios.get<Artist>(`http://localhost:4000/auth/${userService.getUserId()}/user/contact/${contactId}/artist`, {
            'headers': {
                'x-access-token': userService.getToken()
            }})
            .then(response => {
                if(userService.error(response)){
                    return userService.error(response);
                }
                return response.data;
            })
            .catch(error => console.log("error" + error));
    }

    getArtistByEvent(eventId: number): Artist[] {
        return axios.get<Artist[]>(`http://localhost:4000/auth/id/${userService.getUserId()}/event/${eventId}/artist`, {
            'headers': {
                'x-access-token': userService.getToken()
            }})
            .then(response => {
                if(userService.error(response)){
                    return userService.error(response);
                }
                return response.data;
            })
            .catch(error => console.log("error" + error));
    }

    addArtistToEvent(artist: Artist, documentId: number, eventId): void {
        return axios.post(`http://localhost:4000/auth/id/${userService.getUserId()}/event/${eventId}/artist`,
            {artist_name: artist.artist_name,
                  first_name: artist.first_name,
                  last_name: artist.last_name,
                  email: artist.email,
                  phone: artist.phone,
                  document_id: documentId}, {
            'headers': {
                'x-access-token': userService.getToken()
            }})
            .then(response => {
                if(userService.error(response)){
                    return userService.error(response);
                }
                return response.data;
            })
            .catch(error => console.log("error" + error));
    }

    insertArtist(artist: Artist): void {
        return axios.post(`http://localhost:4000/api/artist`, {artistName: artist.artist_name,
                                                                        firstName: artist.first_name,
                                                                        lastName: artist.last_name,
                                                                        email: artist.email,
                                                                        phone: artist.phone})
            .then(response => response.data);
    }

    createArtistOnContact(artistName: string, contactId: number): void {
        return axios.post(`http://localhost:4000/api/artist`, {artistName: artistName,
                                                                         contactId: contactId})
            .then(response => response.data);
    }

    removeArtistFromEvent(eventId: number, artistId: number): void {
        return axios.delete(`http://localhost:4000/auth/id/${userService.getUserId()}/event/${eventId}/artist/${artistId}`, {
            'headers': {
                'x-access-token': userService.getToken()
            }})
            .then(response => {
                if(userService.error(response)){
                    return userService.error(response);
                }
                return response.data;
            })
            .catch(error => console.log("error" + error));
    }

    getArtistByUser(userId: number): Artist[] {
        return axios.get<Artist[]>(`http://localhost:4000/api/artist/user/${userId}`).then(response => response.data);
    }

    getArtistByPreviousContract(contactId: number): Artist[] {
        return axios.get<Artist[]>(`http://localhost:4000/api/artist?contact=${contactId}`).then(response => response.data);
    }
}

export let artistService = new ArtistService();

