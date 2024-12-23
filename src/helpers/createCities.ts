import City from "../models/City";
import Department from "../models/Department";

import data from "../data/colombia.json";

export async function createCities(){

    const count = await City.count();

    if(count > 0) {
        console.log("Cities already created");
        return
    }

    const departments = await Department.findAll();
    departments.forEach(async department => {
        // @ts-ignores
        const { ciudades } = await data.find((d: any) => d.departamento.toLowerCase() === department.name.toLowerCase());
        ciudades.forEach(async (city: string) => {
            await City.build({
                name: city,
                departmentId: department.id
            }).save()
        });
    })
}
