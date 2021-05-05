import { IVehicleDef } from "~/fake-server/interfaces/vehicle-def";

const _m = {
    Honda: "Honda",
    BMW: "BMW",
    AUDI: "AUDI",
    SUZUKI: "SUZUKI",
    TOYOTA: "TOYOTA",
    HYUNDAI: "HYUNDAI",
    ISUZU: "ISUZU",
    MERCEDES: "MERCEDES",
    MG: "MG",
    PORSCHE: "PORSCHE",
    RANG_ROVER: "RANG ROVER",
    CHANGAN: "CHANGAN",
    DFSK: "DFSK",
    FAW: "FAW",
    HAVAL: "HAVAL",
    JAC: "JAC",
    JIN_BEI: "JIN BEI",
    JMC: "JMC",
    KIA: "KIA",
    LAND_ROVER: "LAND ROVER",
    ZOTYE: "ZOTYE",
};

const _e = {
    PETROL: "PETROL",
    DIESEL: "DIESEL",
    HYBRID: "HYBRID",
    CNG: "CNG",
    LPG: "LPG",
};

export const carVehcles: IVehicleDef[] = [
    {
        year: [2018, 2021],
        make: _m.Honda,
        model: "Civic",
        engine: _e.PETROL,
    },
    {
        year: [2000, 2021],
        make: _m.SUZUKI,
        model: "Cultus",
        engine: _e.PETROL,
    },
    {
        year: [2000, 2021],
        make: _m.TOYOTA,
        model: "Corolla",
        engine: _e.PETROL,
    },
    {
        year: [2000, 2021],
        make: _m.KIA,
        model: "Sportage",
        engine: _e.PETROL,
    },
];

