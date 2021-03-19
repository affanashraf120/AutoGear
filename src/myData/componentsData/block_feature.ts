import { Fi24Hours48Svg, FiFreeDelivery48Svg, FiPaymentSecurity48Svg, FiTag48Svg } from "~/svg";
import { JSXElementConstructor } from "react";

type Feature = {
    title: string;
    subtitle: string;
    FeatureIcon: JSXElementConstructor<any>;
};
const features: Feature[] = [
    {
        title: "TEXT_SHOP_FEATURE_FREE_SHIPPING_TITLE",
        subtitle: "TEXT_SHOP_FEATURE_FREE_SHIPPING_SUBTITLE",
        FeatureIcon: FiFreeDelivery48Svg,
    },
    {
        title: "TEXT_SHOP_FEATURE_SUPPORT_TITLE",
        subtitle: "TEXT_SHOP_FEATURE_SUPPORT_SUBTITLE",
        FeatureIcon: Fi24Hours48Svg,
    },
    {
        title: "TEXT_SHOP_FEATURE_SECURITY_TITLE",
        subtitle: "TEXT_SHOP_FEATURE_SECURITY_SUBTITLE",
        FeatureIcon: FiPaymentSecurity48Svg,
    },
    {
        title: "TEXT_SHOP_FEATURE_HOT_OFFERS_TITLE",
        subtitle: "TEXT_SHOP_FEATURE_HOT_OFFERS_SUBTITLE",
        FeatureIcon: FiTag48Svg,
    },
];

export default features;
