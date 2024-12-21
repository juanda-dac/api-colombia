import Department from "../models/Department";
import data from "../data/colombia.json";

export async function createDepartments(){
    const departments = data.map((department) => department.departamento.toLowerCase());
    await Promise.all(departments.map(async (department) => {
        await Department.build({
            name: department
        }).save();
    }))
    console.log("Departments created!");
    
    
}

