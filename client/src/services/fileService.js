import axios from 'axios';
import {userService} from "./userService";
//import { userService } from "../services/userService";

let ip = "localhost";

export class FileInfo {
    document_id: number;
    name: string;
}

class FileInfoService {
    getFileInfo(eventId: number) {
        console.log(eventId);
        return axios.get(`http://localhost:4000/auth/id/${userService.getUserId()}/file/info/${eventId}`, {
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

    postFileInfo(name: string, eventId: number, data: FormData) {
        return axios.post(`http://` + ip +`:4000/auth/id/${userService.getUserId()}/single/${eventId}`,
            data, {
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
    updateFile(data: FormData) {
        return axios.post(`http://` + ip +`:4000/auth/id/${userService.getUserId()}/single/update`,
            data, {
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

    updatePath(id: number) {
        return axios.put('http://' + ip +':4000/auth/id/${userService.getUserId()}/file/path', id, {
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

    checkFileName(eventId: number, name: string){
        return axios.post(`http://` + ip +`:4000/auth/id/${userService.getUserId()}/file/check/${eventId}`, {"name": name}, {
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

    downloadFile(encodedFile: string){
        console.log(encodedFile);
        console.log("hei");
        return axios.get(`http://` + ip +`:4000/auth/id/${userService.getUserId()}/file/download/${encodedFile}`, {
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

    getFileContent(encodedFile: string){
        return axios.get(`http://` + ip +`:4000/auth/id/${userService.getUserId()}/file/edit/${encodedFile}`, {
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
    deleteFile(encodedFile: string){
        return axios.delete(`http://` + ip +`:4000/auth/id/${userService.getUserId()}/file/delete/${encodedFile}`, {
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
}

class FileService {

}

export let fileService = new FileService();
export let fileInfoService = new FileInfoService();