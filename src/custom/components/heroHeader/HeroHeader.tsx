import { version } from "process";
import React from "react";
import { FormattedMessage } from "react-intl";
import BlockFinder from "~/components/blocks/BlockFinder";
import { ISlickProps } from "~/components/shared/AppSlick";
import VehicleSelect from "~/components/shared/VehicleSelect";
import { baseUrl } from "~/services/utils";

const HeroHeader = () => {
    const slide = {
        url: "/catalog/products",
        desktopImage: "/images/slides/slide-3.jpg",
        mobileImage: "/images/slides/slide-3-mobile.jpg",
        offer: "30% OFF",
        title: "When Buying Parts <br>With Installation",
        details: "Installation of parts in the services of <br>our partners.",
        buttonLabel: "Shop Now",
    };
    const slickSettings: ISlickProps = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return <BlockFinder />;
};

export default HeroHeader;
