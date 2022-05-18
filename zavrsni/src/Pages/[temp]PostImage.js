import React from "react";
import { useNavigate } from "react-router-dom";
import { NETWORK_CONFIG, API_CONFIG } from "../AppData/Constants";
import Button from "../Components/Button";
import cx from "classnames";
import Card from "../Components/Card";
import Input from "../Components/Input";

import ImageGallery from "react-image-gallery";

function PostImage(props) {
    const navigate = useNavigate();
    const [error, setError] = React.useState(""); 
    const [images, setImages] = React.useState([]);

    var imageList = new Array(); 

    function addImages(e) {
    imageList = e.target.files;
    console.log(imageList);
    }

    async function onSubmit(e) {
        e.preventDefault();
        setError("");
        console.log(imageList);
        if(imageList.length !== 0) {
            const formData = new FormData();
            for (var image of imageList) {
                formData.append('Image', image);
            }
            formData.append('FileName', "Img");

            const imageOptions = {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json",
                },
            };

            fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.postImage + 7, imageOptions)
            .then((response) => {
                if (!response.ok) {
                    setError("Adding images failed");
                } else {
                    navigate("/");
                }
            })
            .catch((error) => {
                setError("Adding images failed");
            });
        }
    }

    function getImages() {
        setError("");
        const options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        fetch(NETWORK_CONFIG.apiFullHost + "/api/hotel/getImages/9", options)
        .then((response) => {
            if (!response.ok) {
                setError("Getting images failed");
            } else {
                response.json().then((value) => {
                    console.log(value.image);
                    setImages(value.image);
                }).catch((error) => {
                    setError("Getting images failed");
                });             
            }
        })
        .catch((error) => {
            setError("Getting images failed");
        });
        
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input
                    id="images"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={addImages}
                    multiple
                />
            </div>
            <div className="flex justify-center">
                <Button label="Add post" type="submit" />
            </div>
            <div className="flex justify-center">
                <Button label="Get Images" onClick = {() => getImages()} />
            </div>
            <div className="w-full border-solid border-2 rounded flex flex-col items-center justify-center">
                <ImageGallery
                    additionalClass="flex flex-col justify-center items-center width: 40%; height: auto;"
                    items={images}
                    showThumbnails={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showBullets={true}
                />
            </div>
        </form>
    );
}
export default PostImage;
