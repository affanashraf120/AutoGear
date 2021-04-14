import { Fi24Hours48Svg, FiFreeDelivery48Svg, FiPaymentSecurity48Svg, FiTag48Svg, Search20Svg, Check12x9Svg,Car20Svg} from "~/svg";

import { JSXElementConstructor } from "react";

type Feature = {
    title: string;
    subtitle: string;
    FeatureIcon: JSXElementConstructor<any>;
};
const features: Feature[] = [
    {
        title: "CAR_INSPECTION_CHECKPOINT_TITLE",
        subtitle: "CAR_INSPECTION_CHECKPOINT_SUBTITLE",
        FeatureIcon: Search20Svg,
    },
    {
        title: "TEXT_SHOP_FEATURE_SUPPORT_TITLE",
        subtitle: "TEXT_SHOP_FEATURE_SUPPORT_SUBTITLE",
        FeatureIcon: Fi24Hours48Svg,
    },
    {
        title: "CERTIFIED_CAR_TITLE",
        subtitle: "CERTIFIED_CAR_SUBTITLE",
        FeatureIcon: Check12x9Svg,
    },
    {
        title: "CAR_AUCTION_TITLE",
        subtitle: "CAR_AUCTION_SUBTITLE",
        FeatureIcon: Car20Svg,
    },
];

export default features;
