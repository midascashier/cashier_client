import React from 'react'
import {ReaderImages} from '../files/ReaderImages'
import {translate} from '../../../constants/Translate'

let DrawDropUpload = React.createClass({

    propTypes: {
        files: React.PropTypes.func,
        inputId : React.PropTypes.node,
        multiple: React.PropTypes.bool,
        required : React.PropTypes.bool
    },

    elements: {
        rules: {
            MAX_INPUT_FILES: 5,
            MAX_FILE_SIZE: '4194304',
            FILE_ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png']
        },

        totalSize: 0,
        maxInputFiles: 0,
        dropZoneId: 'DropImagesZone',
        thumbnails: 'DragDropThumbnails',
        thumbnailClass: 'DragDropThumbnail'
    },

    /**
     * React function to set component initial state
     */
    getInitialState(){
        return {
            files: false,
            errorMsg: false
        }
    },

    /**
     * React method to execute initial action will mount current component
     */
    componentWillMount(){
        let className = this.elements.dropZoneId;

        window.addEventListener('dragenter', function(e){
            let draggableElement = document.getElementsByClassName(className);
            draggableElement[0].style.zIndex = '1';

            if (e.target.className != className){
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
                e.dataTransfer.effectAllowed = 'none';
            }
        }, false);

        window.addEventListener('dragover', function(e){
            let draggableElement = document.getElementsByClassName(className);
            draggableElement[0].style.zIndex = '1';

            if (e.target.className != className){
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
                e.dataTransfer.effectAllowed = 'none';
            }
        });

        window.addEventListener('drop', function(e){
            let draggableElement = document.getElementsByClassName(className);
            draggableElement[0].style.zIndex = '0';

            if (e.target.className != className){
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
                e.dataTransfer.effectAllowed = 'none';
            }
        });
    },

    /**
     * Validate form files rules
     * 
     * @param files
     * @returns {Array}
     */
    validateFilesToUpload(files){
        let validFiles = [];
        let errorMsg = false;

        for(let key in files){
            if(files.hasOwnProperty(key)){
                if(this.elements.rules.FILE_ACCEPTED_TYPES.indexOf(files[key].types) == -1){
                    if(files[key].size){
                        this.elements.totalSize = this.elements.totalSize + files[key].size;
                        if(this.elements.totalSize < this.elements.rules.MAX_FILE_SIZE){
                            if(this.elements.maxInputFiles < this.elements.rules.MAX_INPUT_FILES){
                                ++this.elements.maxInputFiles;
                                validFiles.push(files[key]);
                            }else{
                                errorMsg = 'Max number files, '+ files[key].name + ' no accept';
                            }
                        }else{
                            errorMsg = 'Max size files, '+ files[key].name + ' no accept';
                        }
                    }
                }else{
                    errorMsg = 'Type file for '+ files[key].name + ' no accept';
                }   
            }
        }

        validFiles['error'] = errorMsg;

        return validFiles;
    },

    /**
     * Remove a file selected
     * 
     * @param element
     */
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
                --this.elements.maxInputFiles;
                this.elements.totalSize = this.elements.totalSize - this.state.files[i].size;
            }
        }

        this.setState({errorMsg: false, files: updateState}, function afterFileChange(){
            if(!this.state.files.length){
                thumbnails.style.zIndex = -1;
            }

            this.props.files(this.state.files);
        });
    },

    /**
     * Add thumbnails to any HTML element
     *
     * @param event
     */
    addThumbnailsFile(event){
        if (window.File && window.FileReader && window.FileList && window.Blob){
            let filesToLoad = [];
            let filesToUpload = [];
            let files = event.target.files;
            let thumbnails = document.getElementById(this.elements.thumbnails);

            if((this.props.multiple)){
                if(!this.state.files){
                    files = this.validateFilesToUpload(files);
                    this.setState({errorMsg: files['error'], files: files}, function afterFileChange(){
                        this.props.files(this.state.files);
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
                            filesToLoad.push(files[i]);
                        }
                    }

                    filesToUpload = this.validateFilesToUpload(filesToLoad);
                    filesList = filesList.concat(filesToUpload);

                    this.setState({errorMsg: filesToUpload['error'], files: filesList}, function afterFileChange(){
                        this.props.files(this.state.files);
                    });
                }
            }else{
                if(thumbnails.lastChild){
                    thumbnails.removeChild(thumbnails.lastChild);
                }

                filesToUpload = this.validateFilesToUpload(files);
                this.setState({errorMsg: filesToUpload['error'], files: filesToUpload}, function afterFileChange(){
                    this.props.files(this.state.files);
                });
            }

            thumbnails.style.zIndex = 1;
            ReaderImages(filesToUpload, thumbnails, this.elements.thumbnailClass, this.removeThumbnail.bind(this));
        }else{
            console.log('The File APIs are not fully supported in this browser.');
        }
    },

    render(){
        let required = (this.props.required) ? 'requires' : '';
        let multiple = (this.props.multiple) ? 'multiple' : '';
        let inputId = (this.props.inputId) ? this.props.inputId : this.elements.dropZoneId;

        return(
            <div id='DrawDropUploadContent'>
                {(() =>{
                    if(this.state.errorMsg){
                        return(
                            <span id="DrawDropErrorMsg">{this.state.errorMsg}</span>
                        )
                    }
                })()}

                <div id='DrawDropUpload'>
                    <input id={inputId} className={this.elements.dropZoneId} type='file' onChange={this.addThumbnailsFile.bind(this)} name='files[]' multiple={multiple} required={required}/>
                    <p>{translate('DRAG_DROP_FILES_TXT')}</p>
                    <output id={this.elements.thumbnails}/>
                </div>
            </div>
        )
    }
});

module.exports.DrawDropUpload = DrawDropUpload;