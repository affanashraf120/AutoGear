import React, { useRef, useState } from "react";
import { Col, Container, Row } from "reactstrap";

type Props = {
    children?: React.ReactNode;
    onSubmitFiles: (files: FileList) => void;
    fileCount: number;
};

const layout = {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
};

const DropZone = (props: Props) => {
    const [isEnter, setIsEnter] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const { children, onSubmitFiles, fileCount } = props;

    const onEnter = () => {
        setIsEnter(true);
    };

    const onExit = () => {
        setIsEnter(false);
    };

    const onDragEnter = (e: React.DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onEnter();
    };
    const onDragLeave = (e: React.DragEvent) => {
        onExit();
    };
    const onDragOver = (e: React.DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const onDropZoneClick = (e: React.MouseEvent) => {
        if (inputRef.current !== null) {
            inputRef.current.click();
        }
    };

    const onDrop = (e: React.DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const { files } = e.dataTransfer;
        onSubmitFiles(files);
    };

    const handleSelectedFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files && onSubmitFiles(e.target.files);
    };

    return (
        <div
            className={`drop-zone ${isEnter ? `drop-zone-enter` : ``}`}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onMouseEnter={onEnter}
            onMouseLeave={onExit}
            onDrop={onDrop}
            onClick={onDropZoneClick}
            onSelect={onEnter}
        >
            <input type="file"  ref={inputRef} onChange={handleSelectedFiles} multiple accept="image/*" />

            <Container>
                <Row {...layout}>
                    <Col>
                        <p>
                            <strong>• Adding at least 8 pictures</strong>
                            {` `}
                            improves the chances for a quick sale.
                        </p>
                    </Col>
                    <Col>
                        <p>
                            <strong>• Adding clear Front, Back and Interior pictures</strong>
                            {` `}
                            of your car increases the quality of your post and gets you noticed more.
                        </p>
                    </Col>
                    <Col>
                        <p>
                            <strong>• Photos should be</strong>
                            {` `}
                            in 'jpeg, jpg, png' format only. Any other document will not be accepted.
                        </p>
                    </Col>
                    <Col>
                        <p>
                            <strong> • </strong> Picture must be {` `}
                            <strong>square and less then or equal to 5MB</strong>
                        </p>
                    </Col>
                </Row>
            </Container>
            {!children && (
                <div className="drop-zone-image">
                    <img src="/images/image-upload.png" alt="upload" width="150px" />
                    <p>Drag images here or click to upload</p>
                </div>
            )}
            {fileCount > 0 && <strong>Files: {fileCount}</strong>}
            {children}
        </div>
    );
};

export default DropZone;
