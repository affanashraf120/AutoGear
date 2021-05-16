// react
import React from "react";
// application
import AppImage from "~/components/shared/AppImage";
import BlockReviews from "~/components/blocks/BlockReviews";
import BlockSpace from "~/components/blocks/BlockSpace";
import BlockTeammates from "~/components/blocks/BlockTeammates";
import Decor from "~/components/shared/Decor";
import PageTitle from "~/components/shared/PageTitle";
import { baseUrl } from "~/services/utils";

function Page() {
    return (
        <React.Fragment>
            <PageTitle>About Us</PageTitle>

            <div className="about">
                <div className="about__body">
                    <div className="about__image">
                        <div
                            className="about__image-bg"
                            style={{
                                backgroundImage: `url(${baseUrl("/images/about.jpeg")})`,
                            }}
                        />
                        <Decor className="about__image-decor" type="bottom" />
                    </div>

                    <div className="about__card">
                        <div className="about__card-title">About Us</div>
                        <div className="about__card-text">
                            AutoGear is a newly developed company for providing car services to both sellers and buyers.
                            Company started a year ago in a local market. This business enterprise has experienced car
                            dealers who offer customers most ideal choice as per their financial plan and their needs.
                            Their administrations incorporate giving best car survey, most recent updates about cars in
                            Pakistan. 
                        </div>
                        <div className="about__card-author">Affan Ashraf, CEO AutoGear</div>
                        <div className="about__card-signature">
                            <AppImage src="/images/about.jpeg" width="160" height="55" />
                        </div>
                    </div>

                    <div className="about__indicators">
                        <div className="about__indicators-body">
                            <div className="about__indicators-item">
                                <div className="about__indicators-item-value">200+</div>
                                <div className="about__indicators-item-title">Vehicles</div>
                            </div>
                            <div className="about__indicators-item">
                                <div className="about__indicators-item-value">1000</div>
                                <div className="about__indicators-item-title">Subscribers</div>
                            </div>
                            <div className="about__indicators-item">
                                <div className="about__indicators-item-value">5 000</div>
                                <div className="about__indicators-item-title">Satisfied customers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BlockSpace layout="divider-xl" />

            <BlockTeammates />

            {/* <BlockSpace layout="divider-xl" />

            <BlockReviews /> */}

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
