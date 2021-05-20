// application
import { clone, delayResponse, error } from "~/server/utils";
import { IVehicle } from "~/interfaces/vehicle";
import { userVehicles, vehicles } from "~/server/database/vehicles";
import axios from "axios";

export async function getYears(): Promise<number[]> {
    const response = await axios.get("/api/vehicles");

    const result: number[] = [];

    response.data.vehicles.forEach((vehicle: any) => {
        if (result.indexOf(vehicle.year) === -1) {
            result.push(vehicle.year);
        }
    });

    return delayResponse(Promise.resolve(result.sort()), 0);
}

export async function getMakes(year: number): Promise<string[]> {
    const response = await axios.get("/api/vehicles");

    const result: string[] = [];

    response.data.vehicles
        .filter((x: any) => x.year === year)
        .forEach((vehicle: any) => {
            if (result.indexOf(vehicle.make) === -1) {
                result.push(vehicle.make);
            }
        });

    return delayResponse(Promise.resolve(result.sort()), 0);
}

export async function getModels(year: number, make: string): Promise<string[]> {

    const response = await axios.get("/api/vehicles");

    const result: string[] = [];

    response.data.vehicles
        .filter((x:any) => x.year === year && x.make === make)
        .forEach((vehicle:any) => {
            if (result.indexOf(vehicle.model) === -1) {
                result.push(vehicle.model);
            }
        });

    return delayResponse(Promise.resolve(result.sort()), 0);
}

export async function getVehicles(year: number, make: string, model: string): Promise<IVehicle[]> {

    const response = await axios.get("/api/vehicles");

    const result = response.data.vehicles.filter((x:any) => x.year === year && x.make === make && x.model === model);

    return delayResponse(Promise.resolve(result.sort()), 0);
}

export function getVehicleByVin(vin: string): Promise<IVehicle> {
    const vinValue = vin.trim();

    const vehicle = vehicles.find((x) => x.model === "Focus S");

    if (vinValue === "" || vinValue === "error" || !vehicle) {
        return error("Page Not Found");
    }

    return Promise.resolve(vehicle);
}

export function getUserVehicles(): Promise<IVehicle[]> {
    return Promise.resolve(clone(userVehicles));
}

export function addUserVehicles(vehicleId: number): Promise<void> {
    const index = userVehicles.findIndex((x) => x.id === vehicleId);
    const vehicle = vehicles.find((x) => x.id === vehicleId);

    if (vehicle && index === -1) {
        userVehicles.push(vehicle);
    }

    return delayResponse(Promise.resolve());
}

export function removeUserVehicles(vehicleId: number): Promise<void> {
    const index = userVehicles.findIndex((x) => x.id === vehicleId);

    if (index !== -1) {
        userVehicles.splice(index, 1);
    }

    return delayResponse(Promise.resolve());
}
