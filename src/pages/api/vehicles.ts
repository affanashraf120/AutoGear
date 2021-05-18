import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import Vehicle from "~/models/vehicle";
import { IVehicle } from "~/interfaces/vehicle";
import { IVehicleDef } from "~/server/interfaces/vehicle-def";
import { makeIdGenerator } from "~/server/utils";

const getNextId = makeIdGenerator();

function makeVehicles(defs: IVehicleDef[]): IVehicle[] {
    return defs
        .map((def) => {
            const range = typeof def.year === "number" ? [def.year, def.year] : def.year;
            const years = [];

            for (let i = range[0]; i <= range[1]; i += 1) {
                years.push(i);
            }

            return years.map((year) => ({
                id: getNextId(),
                year,
                make: def.make,
                model: def.model,
                engine: def.engine,
            }));
        })
        .reduce((acc, v) => [...acc, ...v], []);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                const vehicle = await Vehicle.create({
                    ...req.body,
                });
                res.status(201).json({ success: true, data: vehicle });
            } catch (error) {
                res.status(400).json({
                    error,
                    data: req.body,
                });
            }
            break;
        case "GET":
            try {
                const vehicleData = await Vehicle.find({});
                
                let vehicleDefs = vehicleData.map((vehicleEl) => {
                    const vehicle: IVehicleDef = {
                        make: vehicleEl.make,
                        model: vehicleEl.model,
                        engine: vehicleEl.engine,
                        year: [parseInt(vehicleEl.year[0]), parseInt(vehicleEl.year[1])],
                    };
                    return vehicle;
                });

                const vehicles = makeVehicles(vehicleDefs);

                res.status(202).json({ success: true, vehicles });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
