/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { AbstractFilterBuilder } from "~/server/filters/abstract-filter-builder";
import { IProduct } from "~/interfaces/product";
import { IVehicle } from "~/interfaces/vehicle";
import { IVehicleFilter, IVehicleFilterValue } from "~/interfaces/filter";
import { vehicles as dbVehicles } from "~/server/database/vehicles";
import { makeVehicles } from "../utils";
import axios from "axios";
import { getHostUrl } from "~/services/utils";

export class VehicleFilterBuilder extends AbstractFilterBuilder {
    private value: IVehicleFilterValue = null;

    private vehicle: IVehicle | null = null;

    private static testCompatibility(vehicle: IVehicle, product: IProduct): boolean {
        const { make, model, engine } = vehicle;
        const { name, version } = product;

        if (`${make} ${model}` === name) {
            return true;
        }

        return false;
    }

    test(product: IProduct): boolean {
        if (this.value) {
            return this.vehicle !== null && VehicleFilterBuilder.testCompatibility(this.vehicle, product);
        }

        return true;
    }

    async makeItems(products: IProduct[], value: string) {
        try {
            const url = getHostUrl();
            const response = await axios.get(`${url}/api/vehicles`);
            const dbVehicles = response.data.vehicles;
            // this.vehicle = dbVehicles.find((x: any) => x.id === parseFloat(value)) || null;
            this.vehicle = dbVehicles.find((x: any) => `${x.make} ${x.model}` === value) || null;
            this.value = this.vehicle ? this.vehicle.id : null;
        } catch (error) {
            console.log(error);
        }
    }

    calc(): void {}

    build(): IVehicleFilter {
        return {
            type: "vehicle",
            slug: this.slug,
            name: this.name,
            value: this.value,
            vehicle: this.vehicle,
        };
    }
}
