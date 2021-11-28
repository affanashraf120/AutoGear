// react
import React, { useEffect, useMemo } from 'react';
// third-party
import { useIntl } from 'react-intl';
// application
import firebase from 'firebase';
import BlockBrands from '~/components/blocks/BlockBrands';
import BlockFeatures from '~/components/blocks/BlockFeatures';
import BlockFinder from '~/components/blocks/BlockFinder';
import BlockPosts from '~/components/blocks/BlockPosts';
import BlockProductsCarousel from '~/components/blocks/BlockProductsCarousel';
import BlockSpace from '~/components/blocks/BlockSpace';
import url from '~/services/url';
import { blogApi, shopApi } from '~/api';
import { useDeferredData, useProductTabs } from '~/services/hooks';
import { brands } from '~/myData/brandsData';

function Page() {
    const intl = useIntl();

    const slides = useMemo(
        () => [
            {
                url: '/find-cars',
                desktopImage:
                    'https://res.cloudinary.com/autogear/image/upload/c_crop,h_500,w_1350/v1621514394/Postors/jridteuujlsizggo3bmk.jpg',
                mobileImage:
                    'https://res.cloudinary.com/autogear/image/upload/c_crop,h_500,w_1350/v1621514394/Postors/jridteuujlsizggo3bmk.jpg',
                offer: 'Secure Auction',
                title: 'Bid your favourite car',
                details: 'Bid higher to win your favourite cars.',
                buttonLabel: 'Explore',
            },
            {
                url: '/find-cars',
                desktopImage:
                    'https://res.cloudinary.com/autogear/image/upload/c_crop,h_500,w_13500/v1621514877/Postors/pkeffh0mlmcp0c24sa1d.jpg',
                mobileImage:
                    'https://res.cloudinary.com/autogear/image/upload/c_crop,h_500,w_13500/v1621514877/Postors/pkeffh0mlmcp0c24sa1d.jpg',
                title: 'Featured Ad',
                offer: 'Boost Your Sales',
                details: 'App ly for Ad to rank up your products.',
                buttonLabel: 'Explore',
            },
            {
                url: '/find-cars',
                desktopImage:
                    'https://res.cloudinary.com/autogear/image/upload/c_crop,h_500,w_1350/v1621515129/Postors/krq0l5edphsnahqxstep.jpg',
                mobileImage:
                    'https://res.cloudinary.com/autogear/image/upload/c_crop,h_500,w_1350/v1621515129/Postors/krq0l5edphsnahqxstep.jpg',
                offer: 'Sell And Buy',
                title: 'Sell and buy your car',
                details: 'Sell your car and buy your avourite one.',
                buttonLabel: 'Explore',
            },
        ],
        [],
    );

    /**
     * Featured products.
     */
    const featuredProducts = useProductTabs(
        useMemo(
            () => [
                { id: 1, name: 'All', categorySlug: null },
            ],
            [],
        ),
        (tab) => shopApi.getFeaturedProducts(tab.categorySlug, 8),
    );

    const latestPosts = useDeferredData(() => blogApi.getLatestPosts(8), []);
    const latestPostsLinks = useMemo(
        () => [
            { title: 'Special Offers', url: url.blog() },
            { title: 'New Arrivals', url: url.blog() },
            { title: 'Reviews', url: url.blog() },
        ],
        [],
    );

    useEffect(() => {
        const db = firebase.database();
        const ref = db.ref('/');
        ref.on(
            'value',
            (snapshot) => snapshot.val(),
            (errorObject) => undefined,
        );
    }, []);

    return (
        <React.Fragment>
            <BlockFinder />
            <BlockSpace layout="divider-nl" />
            <BlockFeatures layout="top-strip" />
            <BlockSpace layout="divider-nl" />
            <BlockBrands layout="columns-8-full" brands={brands.slice(0, 16)} />
            <BlockSpace layout="divider-nl" />
            <BlockProductsCarousel
                blockTitle={intl.formatMessage({ id: 'HEADER_FEATURED_PRODUCTS' })}
                layout="grid-5"
                loading={featuredProducts.isLoading}
                products={featuredProducts.data}
                groups={featuredProducts.tabs}
                currentGroup={featuredProducts.tabs.find((x) => x.current)}
                onChangeGroup={featuredProducts.handleTabChange}
            />
            <BlockSpace layout="divider-nl" />
            <BlockSpace layout="divider-nl" />
            <BlockPosts
                blockTitle={intl.formatMessage({ id: 'HEADER_LATEST_NEWS' })}
                layout="grid"
                loading={latestPosts.isLoading}
                posts={latestPosts.data}
                links={latestPostsLinks}
            />

            <BlockSpace layout="divider-nl" className="d-xl-block d-none" />
            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
