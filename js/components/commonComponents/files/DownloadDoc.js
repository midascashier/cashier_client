import Document from 'js-file-download'

let DownloadDoc = (path, name) =>{
    let request = new XMLHttpRequest();
    request.open("GET", document.location.origin + '/' + path, true);
    request.responseType = "blob";

    request.onload = function() {
        return (
            Document(request.response, name)
        );
    };

    request.send();
};

module.exports.DownloadDoc = DownloadDoc;