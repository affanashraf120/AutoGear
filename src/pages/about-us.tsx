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
                                backgroundImage: `url(${baseUrl("/images/about.jpg")})`,
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
                            Pakistan. AutoGear have not any electronic means for their services. Now business enterprise
                            desires to develop their enterprise to throughout Pakistan via Web Application and social
                            platforms like Facebook, Instagram, and YouTube. AutoGear hired us for their project
                            development. And we will develop a Web Application for their enterprise which uses the
                            reverse marketplace model to remove the need for buyers to negotiate with car sellers. Users
                            choose the car they would like to buy, along with the various specifications and features
                            and receive offers directly from dealers. And website provides best review for cars via
                            videos on YouTube channel and integrate with Facebook and Instagram.
                        </div>
                        <div className="about__card-author">Ryan Ford, CEO RedParts</div>
                        <div className="about__card-signature">
                            <AppImage src="/images/signature.jpg" width="160" height="55" />
                        </div>
                    </div>

                    <div className="about__indicators">
                        <div className="about__indicators-body">
                            <div className="about__indicators-item">
                                <div className="about__indicators-item-value">350</div>
                                <div className="about__indicators-item-title">Stores around the world</div>
                            </div>
                            <div className="about__indicators-item">
                                <div className="about__indicators-item-value">80 000</div>
                                <div className="about__indicators-item-title">Original auto parts</div>
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

            <BlockSpace layout="divider-xl" />

            <BlockReviews />

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
