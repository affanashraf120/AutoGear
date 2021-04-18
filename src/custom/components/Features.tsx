import React from "react";
import { FormattedMessage } from "react-intl";
import { Fi24Hours48Svg, FiFreeDelivery48Svg, FiPaymentSecurity48Svg, FiTag48Svg } from "~/svg";

const Features = () => {
    return (
        <div className="product__shop-features shop-features">
            <ul className="shop-features__list">
                <li className="shop-features__item">
                    <div className="shop-features__item-icon">
                        <FiFreeDelivery48Svg />
                    </div>
                    <div className="shop-features__info">
                        <div className="shop-features__item-title">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_FREE_SHIPPING_TITLE" />
                        </div>
                        <div className="shop-features__item-subtitle">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_FREE_SHIPPING_SUBTITLE" />
                        </div>
                    </div>
                </li>
                <li className="shop-features__divider" role="presentation" />
                <li className="shop-features__item">
                    <div className="shop-features__item-icon">
                        <Fi24Hours48Svg />
                    </div>
                    <div className="shop-features__info">
                        <div className="shop-features__item-title">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_SUPPORT_TITLE" />
                        </div>
                        <div className="shop-features__item-subtitle">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_SUPPORT_SUBTITLE" />
                        </div>
                    </div>
                </li>
                <li className="shop-features__divider" role="presentation" />
                <li className="shop-features__item">
                    <div className="shop-features__item-icon">
                        <FiPaymentSecurity48Svg />
                    </div>
                    <div className="shop-features__info">
                        <div className="shop-features__item-title">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_SECURITY_TITLE" />
                        </div>
                        <div className="shop-features__item-subtitle">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_SECURITY_SUBTITLE" />
                        </div>
                    </div>
                </li>
                <li className="shop-features__divider" role="presentation" />
                <li className="shop-features__item">
                    <div className="shop-features__item-icon">
                        <FiTag48Svg />
                    </div>
                    <div className="shop-features__info">
                        <div className="shop-features__item-title">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_HOT_OFFERS_TITLE" />
                        </div>
                        <div className="shop-features__item-subtitle">
                            <FormattedMessage id="TEXT_SHOP_FEATURE_HOT_OFFERS_SUBTITLE" />
                        </div>
                    </div>
                </li>
                <li className="shop-features__divider" role="presentation" />
            </ul>
        </div>
    );
};

export default Features;
