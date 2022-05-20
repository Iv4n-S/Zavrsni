import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

function ImageGallery(props) {
    const [selectedImage, setSelectedImage] = React.useState(props.images[0]);

    return (
        <div>
            <div className="mb-2">
                <img src={selectedImage.original} className="h-80 w-96 border-4 rounded-lg border-cyan-500"/>
            </div>
            <div>
                <ScrollMenu>
                    {props.images.map((image, i) => (
                        <img src={image.original} key={i} 
                        className={selectedImage == image ? "h-40 w-40 border-4 border-cyan-500 rounded-lg mr-2" : "h-40 w-40 border-2 rounded-lg mr-2"} 
                        onClick={() => setSelectedImage(image)} />
                        ))
                    }
                </ScrollMenu>
            </div>
        </div>
    
    )
}

export default ImageGallery;