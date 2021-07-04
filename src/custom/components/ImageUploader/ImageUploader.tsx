import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
// import ReactCrop from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
import { Col, Container, Row } from "reactstrap";
import DropZone from "./DropZone";
import ImageCard from "./ImageCard";

type Props = {
    onChange: any;
    className: any;
};

const ImagePicker = (props: Props) => {
    const { onChange, className } = props;
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [cropImage, setCropImage] = useState<string>();
    const { errors } = useFormContext();

    const handleSubmitFiles = (files: FileList) => {
        let image_files = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (isImage(file) && isValidFileSize(file)) {
                image_files.push(file);
            }
        }
        onChange(image_files);
        setImageFiles([...imageFiles, ...image_files]);
    };

    const isImage = (file: File) => {
        return file.type.includes("image");
    };

    const isValidFileSize = (file: File) => {
        return file.size <= 5242880;
    };

    const handleDeleteImage = (id: number) => {
        let images = imageFiles;
        images = images.filter((image, index) => index !== id);
        setImageFiles(images);
        onChange([...images]);
    };

    const handleCropImage = (url: string) => {
        setCropImage(url);
    };

    const layout = {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
    };

    return (
        <div style={{ height: "auto" }} className={className}>
            <DropZone onSubmitFiles={handleSubmitFiles} fileCount={imageFiles.length}>
                {imageFiles.length > 0 && (
                    <Container className="image-cards-container">
                        <Row {...layout}>
                            {imageFiles.map((imageFile, index) => (
                                <Col key={index}>
                                    <ImageCard
                                        id={index}
                                        imageURL={URL.createObjectURL(imageFile)}
                                        onDelete={handleDeleteImage}
                                        onEdit={handleCropImage}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                )}
            </DropZone>
            {/* {cropImage && (
        <ReactCrop
          src={cropImage}
          crop={crop}
          onChange={(newCrop) => {
            console.log(newCrop);
            newCrop.aspect && setCrop({ aspect: newCrop.aspect });
          }}
        />
      )} */}
        </div>
    );
};

export default ImagePicker;
