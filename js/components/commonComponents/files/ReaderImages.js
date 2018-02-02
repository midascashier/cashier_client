/**
 * This method returns an html with the image to read, this needs files to read, an html element to add it, and a class name to set the style element of the thumbnails
 *
 * @param files
 * @param element
 * @param className
 * @function removeThumbnail - execute to click any thumbnails
 * @constructor
 */
let ReaderImages = (files, element, className, removeThumbnail) =>{
    for (let i = 0, f; f = files[i]; i++){
        if (!f.type.match('image.*')) {
            continue;
        }

        let reader = new FileReader();

        //Closure to capture the file information.
        reader.onload = (function (theFile){
            return function (e){
                let span = document.createElement('span');
                span.innerHTML = ['<img class="', className ,'" src="', e.target.result, '" title="', escape(theFile.name), '"/>' +
                '<span id='+ theFile.name +' class="DocsFileRemoveThumbnail">&times;</span>'].join('');
                element.insertBefore(span, null);

                let remove = document.getElementById(theFile.name);
                remove.addEventListener("click", function(){
                    removeThumbnail()
                });
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
};

module.exports.ReaderImages = ReaderImages;