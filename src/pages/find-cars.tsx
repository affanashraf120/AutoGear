// react
import React from "react";
// application
import getShopPageData from "~/store/shop/shopHelpers";
import ShopPageShop from "~/components/shop/ShopPageShop";
import { wrapper } from "~/store/store";
import ProductsShopView from "~/custom/components/ProductsShopView";

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    await getShopPageData(context);
});

function Page() {
    return <ProductsShopView layout="grid" gridLayout="grid-4-sidebar" sidebarPosition="start" />;
}

export default Page;
