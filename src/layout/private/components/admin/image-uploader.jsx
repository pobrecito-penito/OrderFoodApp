import React from 'react';
import ImageUploader from 'react-images-upload';
 
const ImageUpload = () => {


    return (
        <ImageUploader
            withIcon={false}
            buttonText='Choose image'
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
        />
    );
}


export default ImageUpload