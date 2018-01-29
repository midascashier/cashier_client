import React from 'react'
import {ReaderImages} from '../files/ReaderImages'
import {translate} from '../../../constants/Translate'

let DrawDropUpload = React.createClass({

    elements: {
        dropZoneId: 'dropImagesZone',
        thumbnails: 'DragDropThumbnails'
    },

    componentWillMount(){
        let id = this.elements.dropZoneId;

        window.addEventListener('dragenter', function(e){
            if (e.target.id != id){
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
                e.dataTransfer.effectAllowed = 'none';
            }
        }, false);

        window.addEventListener('dragover', function(e){
            if (e.target.id != id){
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
                e.dataTransfer.effectAllowed = 'none';
            }
        });

        window.addEventListener('drop', function(e){
            if (e.target.id != id){
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
                e.dataTransfer.effectAllowed = 'none';
            }
        });
    },

    addThumbnailsFile(event){
        if (window.File && window.FileReader && window.FileList && window.Blob){
            let files = event.target.files;
            let thumbnails = document.getElementById(this.elements.thumbnails);

            ReaderImages(files, thumbnails);
        }else{
            console.log('The File APIs are not fully supported in this browser.');
        }
    },

    render(){
        return(
            <div id='DrawDropUploadContent'>
                <form id='DrawDropUpload'>
                    <input id={this.elements.dropZoneId} type='file' onChange={this.addThumbnailsFile.bind(this)} name='files[]' multiple/>
                    <p>{translate('DRAG_DROP_FILES_TXT')}</p>
                    <output id={this.elements.thumbnails}/>
                    <button type='submit'>{translate('DRAG_DROP_UPLOAD_TXT')}</button>
                </form>
            </div>
        )
    }
});

module.exports.DrawDropUpload = DrawDropUpload;