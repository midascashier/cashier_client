import React from 'react'
import {ReaderImages} from '../files/ReaderImages'
import {translate} from '../../../constants/Translate'

let DrawDropUpload = React.createClass({
    componentWillMount(){
        let dropzoneId = 'dropzoneId';

        window.addEventListener('dragenter', function(e){
            if (e.target.id != dropzoneId){
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
                e.dataTransfer.effectAllowed = 'none';
            }
        }, false);

        window.addEventListener('dragover', function(e){
            if (e.target.id != dropzoneId){
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
                e.dataTransfer.effectAllowed = 'none';
            }
        });

        window.addEventListener('drop', function(e){
            if (e.target.id != dropzoneId){
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
                e.dataTransfer.effectAllowed = 'none';
            }
        });
    },

    addFile(event){
        if (window.File && window.FileReader && window.FileList && window.Blob){
            let files = event.target.files;
            let thumb = document.getElementById('list');

            ReaderImages(files, thumb);
        }else{
            console.log('The File APIs are not fully supported in this browser.');
        }
    },

    render(){
        return(
            <div id='DrawDropUploadContent'>
                <form id='DrawDropUpload'>
                    <input id='dropzoneId' draggable='true' type='file' onChange={this.addFile.bind(this)} name='files[]' multiple/>
                    <p>{translate('DRAG_DROP_FILES_TXT')}</p>
                    <output id='list'/>
                    <button type='submit'>{translate('DRAG_DROP_UPLOAD_TXT')}</button>
                </form>
            </div>
        )
    }
});

module.exports.DrawDropUpload = DrawDropUpload;