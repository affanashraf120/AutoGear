import React, { useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { Button, Card, CardImg, CardImgOverlay } from "reactstrap";

type Props = {
    imageURL: string;
    onDelete: (id: number) => void;
    onEdit: (url: string) => void;
    id: number;
};

const ImageCard = (props: Props) => {
    const { imageURL, onDelete, id, onEdit } = props;
    const [isPreview, setIsPreview] = useState(false);

    const openPreview = () => {
        setIsPreview(true);
    };
    const closePreview = () => {
        setIsPreview(false);
    };
    const deleteHandler = () => {
        onDelete(id);
    };
    const editHandler = () => {
        onEdit(imageURL);
    };
    const buttonStyles = {
        backgroundColor: "#96949477",
        border: "none",
        borderRadius: "0",
    };

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
            }}
            style={{
                boxShadow: "1px 1px 13px 0px rgba(0,0,0,0.47)",
                margin: "5px",
                borderRadius: "20px",
            }}
        >
            <Card>
                <CardImg width="200px" height="100px" style={{ opacity: 0.9 }} src={imageURL} alt="Car" />
                <CardImgOverlay color="grey">
                    <div style={{ width: "30px", display: "flex" }}>
                        <Button style={buttonStyles} onClick={openPreview}>
                            <img src="/images/preview.svg" width="10px" alt="preview" />
                        </Button>
                        {/* <Button style={buttonStyles} onClick={editHandler}>
                            <img src="/images/edit.svg" width="10px" alt="edit" />
                        </Button> */}
                        <Button style={buttonStyles} onClick={deleteHandler}>
                            <img src="/images/delete.svg" width="10px" alt="Delete" />
                        </Button>
                    </div>
                </CardImgOverlay>
            </Card>
            {isPreview && <ImageViewer src={[imageURL]} onClose={closePreview} />}
        </div>
    );
};

export default ImageCard;
