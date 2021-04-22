import React from "react";
import AppLink from "~/components/shared/AppLink";
import ShareLinks from "~/components/shared/ShareLinks";
import { ICarPost } from "~/interfaces/custom/car";

const ProductTagsAndShare = (product: ICarPost) => {
    return (
        <div className="product__tags-and-share-links">
            {product.tags && product.tags.length > 0 && (
                <div className="product__tags tags tags--sm">
                    <div className="tags__list">
                        {product.tags.map((tag, index) => (
                            <AppLink href="/" key={index}>
                                {tag}
                            </AppLink>
                        ))}
                    </div>
                </div>
            )}
            <ShareLinks className="product__share-links" />
        </div>
    );
};

export default ProductTagsAndShare;
