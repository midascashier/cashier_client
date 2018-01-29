let ReaderImages = (files, element, className = null) =>{
    for (let i = 0, f; f = files[i]; i++){
        if (!f.type.match('image.*')) {
            continue;
        }

        let reader = new FileReader();

        //Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                let span = document.createElement('span');
                let classElement = (className) ? className : 'readerImage';
                span.innerHTML = ['<img class="', classElement ,'" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
                element.insertBefore(span, null);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
};

module.exports.ReaderImages = ReaderImages;