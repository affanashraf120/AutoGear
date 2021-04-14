import React from "react";
import ProductsView from "~/components/shop/ProductsView";
import ShopPageShop from "~/components/shop/ShopPageShop";

const CarView = () => {
    return (
        <React.Fragment>
            <ShopPageShop layout="grid" gridLayout="grid-4-sidebar" sidebarPosition="start" />
        </React.Fragment>
    );
};

export default CarView;
