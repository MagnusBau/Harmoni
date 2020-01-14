import * as React from 'react';
import {Component} from "react-simplified";
import { createHashHistory } from 'history';
const history = createHashHistory();
import axios from 'axios';
import { FileInfo, fileInfoService, fileService } from "../services/fileService";
import { userService } from "../services/userService";

export class FileMain extends Component <{match: {params: {eventId: number}}}> {
    form: any = null;
    name: string = "";
    fileList: any = [];
    errorMessage: string = "";

    render() {
        return(
            <div className="row justify-content-center">
                <div className="row" style={{}}>
                    <div className="card" style={{}}>
                        <form ref={e => (this.form = e)}>
                            <input
                                type="text"
                                className="form-control"
                                value={this.name}
                                placeholder="Filnavn"
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.name = event.target.value)}
                                required
                                maxLength={50}
                            />
                            <input
                                type="file"
                                className="form-control"
                                value={this.file}
                                placeholder="Fil"
                                onChange={(e) => this.handleFile(e)}
                                required
                                style={{paddingBottom: "50px", paddingTop: "20px"}}
                            />
                            <button
                                type="button"
                                className="btn btn-dark"
                                style={{}}
                                onClick={e => this.upload(e)}
                                style={{marginBottom: "0px", marginTop: "20px", width: "100%"}}
                            >Last opp</button>
                            <button
                                type="button"
                                className="btn btn-dark"
                                style={{}}
                                onClick={e => this.upload(e)}
                                style={{marginBottom: "0px", marginTop: "20px", width: "100%"}}
                            >Skriv over</button>
                            <button
                                type="button"
                                className="btn btn-dark"
                                style={{}}
                                onClick={e => this.upload(e)}
                                style={{marginBottom: "0px", marginTop: "20px", width: "100%"}}
                            >Slett</button>
                        </form>
                        <p style={{color: "red"}}>{this.errorMessage}</p>
                    </div>
                </div>
                <div className="card" style={{width: "25%"}}>
                    <div className="list-group">
                        <li className="list-group-item" style={{}}>
                            <div className="row justify-content-center">
                                Documents with event_id: {this.props.match.params.event}
                            </div>
                        </li>
                        {this.fileList.map(f => (
                            <li key={"fileId" + f.document_id} fileId={f.document_id} fileName={f.name} className="list-group-item list-group-item-action">
                                {f.name}
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    mounted() {
        this.fetch();
    }

    fetch() {
        fileInfoService.getFileInfo(this.props.match.params.eventId).then(response => {
            this.fileList = response;
        })
    }

    handleFile(e) {
        let file = e.target.files[0];
        this.setState({file: file});
    }

    handleUpload(e) {
        let file = this.state.file;
        let formData = new FormData();

        formData.append('file', file);
        formData.append('name', this.name);

        fileInfoService.postFileInfo(this.name).then(response => {
            console.log("should have posted fileInfo to database");
            if(response.data.insertId > 0) {
                axios({
                    method: 'POST',
                    url: 'http://localhost:4000/api/file/upload',
                    headers: {
                        //'x-access-token': userService.getToken(),
                        'fileId': response.data.insertId
                    },
                    data: formData
                }).then(response2 => {
                    console.log("should have uploaded");
                    fileInfoService.updatePath(response.data.insertId).then(response3 => {
                        console.log("should have updated path in database");
                    });
                });
            }
        });
    }

}