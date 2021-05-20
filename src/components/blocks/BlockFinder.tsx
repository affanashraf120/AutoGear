// react
import React, { useEffect, useState } from "react";
// third-party
import { FormattedMessage } from "react-intl";
// application
import Decor from "~/components/shared/Decor";
import url from "~/services/url";
import VehicleSelect from "~/components/shared/VehicleSelect";
import { baseUrl, getHostUrl } from "~/services/utils";
import { hrefToRouterArgs, useAppRouter } from "~/services/router";
import { IVehicle } from "~/interfaces/vehicle";
import axios from "axios";

function BlockFinder() {
    const router = useAppRouter();
    const [vehicle, setVehicle] = useState<IVehicle | null>(null);
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");

    const getProduct = (make: string, model: string) => {
        axios
            .post(`${getHostUrl()}/api/products/getProductByVehicle`, { make, model })
            .then((res) => {
                console.log(res.data.data);
                router.push(...hrefToRouterArgs(url.product(res.data.data))).then();
            })
            .catch((err) => {
                router.push(...hrefToRouterArgs(url.notFound())).then();
            });
    };

    const onChangeVehicle = (vehicle: any) => {
        console.log(vehicle);
        const { make, model } = vehicle;
        setMake(make);
        setModel(model);
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        getProduct(make, model);

        if (!vehicle) {
            return;
        }
    };

    return (
        <div className="block block-finder">
            {/* <Decor className="block-finder__decor" type="bottom" /> */}
            <div
                className="block-finder__image"
                style={{ backgroundImage: `url(${baseUrl("/images/autogear-postor.jpg")})` }}
            />
            <div className="block-finder__body container container--max--xl">
                <div className="block-finder__title">
                    <FormattedMessage id="TEXT_BLOCK_FINDER_TITLE" />
                </div>
                <div className="block-finder__subtitle">
                    <FormattedMessage id="TEXT_BLOCK_FINDER_SUBTITLE" />
                </div>
                <form className="block-finder__form" onSubmit={onSubmit}>
                    <VehicleSelect className="block-finder__select" onVehicleChange={onChangeVehicle} />

                    <button className="block-finder__button" type="submit">
                        <FormattedMessage id="BUTTON_BLOCK_FINDER_SEARCH" />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default React.memo(BlockFinder);
