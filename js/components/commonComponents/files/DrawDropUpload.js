import React from 'react'
import {ReaderImages} from '../files/ReaderImages'
import {translate} from '../../../constants/Translate'

let DrawDropUpload = React.createClass({

    propTypes: {
        action: React.PropTypes.func
    },

    elements: {
        dropZoneId: 'DropImagesZone',
        thumbnails: 'DragDropThumbnails',
        thumbnailClass: 'DragDropThumbnail'
    },

    /**
     * React function to set component initial state
     */
    getInitialState(){
        return {files: false}
    },

    /**
     * React method to execute initial action will mount current component
     */
    componentWillMount(){
        let id = this.elements.dropZoneId;

        window.addEventListener('dragenter', function(e){
            let draggableElement = document.getElementById(id);
            draggableElement.style.zIndex = '1';

            if (e.target.id != id){
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
                e.dataTransfer.effectAllowed = 'none';
            }
        }, false);

        window.addEventListener('dragover', function(e){
            let draggableElement = document.getElementById(id);
            draggableElement.style.zIndex = '1';

            if (e.target.id != id){
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
                e.dataTransfer.effectAllowed = 'none';
            }
        });

        window.addEventListener('drop', function(e){
            let draggableElement = document.getElementById(id);
            draggableElement.style.zIndex = '0';

            if (e.target.id != id){
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
                e.dataTransfer.effectAllowed = 'none';
            }
        });
    },

    removeThumbnail(element){
        let thumbnails = document.getElementById(this.elements.thumbnails);
        let thumbnail = document.getElementById(element + 'Content');
        thumbnails.removeChild(thumbnail);
        let updateState = [];
        let count = this.state.files.length;
        for(let i=0; i<count; i++){
            if(this.state.files[i].name != element){
                updateState.push(this.state.files[i]);
            }else{
                let form = document.getElementById('DrawDropUpload');
                let formData = new FormData(form);
                let files = formData.getAll("files[]");

                formData.delete(i);
            }
        }

        this.setState({
            files: updateState
        });
    },

    /**
     * Add thumbnails to any HTML element
     *
     * @param event
     */
    addThumbnailsFile(event){
        if (window.File && window.FileReader && window.FileList && window.Blob){
            let filesToUpload = [];
            let files = event.target.files;

            if(!this.state.files){
                this.setState({
                    files: files
                });

                filesToUpload = files;
            }else{

                files = Array.from(files);
                let filesList = Array.from(this.state.files);

                let countF = files.length;
                let countFls = filesList.length;

                for(let i=0; i<countF; i++){
                    let found = false;
                    for(let j=0; j<countFls; j++){
                        if(files[i].type == filesList[j].type){
                            if(files[i].size == filesList[j].size){
                                if(files[i].name == filesList[j].name){
                                    found = true;
                                    break
                                }
                            }
                        }
                    }

                    if(!found){
                        filesList.push(files[i]);
                        filesToUpload.push(files[i]);
                    }
                }

                this.setState({
                    files: filesList
                });
            }

            let thumbnails = document.getElementById(this.elements.thumbnails);
            ReaderImages(filesToUpload, thumbnails, this.elements.thumbnailClass, this.removeThumbnail.bind(this));
        }else{
            console.log('The File APIs are not fully supported in this browser.');
        }
    },

    render(){
        let disabledUpload = (this.state.files) ? '' : 'disabled';
        return(
            <div id='DrawDropUploadContent'>
                <form id='DrawDropUpload' onSubmit={this.props.action}>
                    <input id={this.elements.dropZoneId} type='file' onChange={this.addThumbnailsFile.bind(this)} name='files[]' multiple/>
                    <p>{translate('DRAG_DROP_FILES_TXT')}</p>
                    <output id={this.elements.thumbnails}/>
                    <button type='submit' disabled={disabledUpload}>{translate('DRAG_DROP_UPLOAD_TXT')}</button>
                </form>
            </div>
        )
    }
});

module.exports.DrawDropUpload = DrawDropUpload;