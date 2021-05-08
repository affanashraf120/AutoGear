// react
import React from "react";

function BlockMap() {
    return (
        <div className="block block-map">
            <div className="block-map__body">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54445.68829915058!2d74.31025947910155!3d31.473160399999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919069d6969d1e7%3A0x3d0018edc65e2d8!2sModel%20Town%20Courts!5e0!3m2!1sen!2s!4v1620456905987!5m2!1sen!2s"
                    width="600"
                    height="450"
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
}

export default BlockMap;
