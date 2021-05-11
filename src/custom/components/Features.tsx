import React from "react";
import { FormattedMessage } from "react-intl";
import features from "~/myData/componentsData/block_feature";

const Features = () => {
    return (
        <div className="product__shop-features shop-features">
            <ul className="shop-features__list">
                {features.map(({ title, subtitle, FeatureIcon }, index) => (
                    <li key={index} className="shop-features__item">
                        <div className="shop-features__item-icon">
                            <FeatureIcon />
                        </div>
                        <div className="shop-features__info">
                            <div className="shop-features__item-title">
                                <FormattedMessage id={title} />
                            </div>
                            <div className="shop-features__item-subtitle">
                                <FormattedMessage id={subtitle} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Features;
