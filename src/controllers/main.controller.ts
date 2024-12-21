import { Request, Response } from "express";
import { sequelize } from "../db/db";
import City from "../models/City";
import Department from "../models/Department";

import { Op } from "@sequelize/core";

export async function getDepartments(req: Request, res: Response) {
    const { department, begginWith } = req.query;
    const whereClause: any = {};

    if (department) {
        // @ts-ignore
        whereClause.name = { [Op.like]: `${department.toLowerCase()}%` };
    }

    const includeClause: any = {
        model: City,
    };

    if (begginWith) {
        // @ts-ignore
        includeClause.where = { name: { [Op.like]: `${begginWith.toLowerCase()}%` } };
    }

    const departmentDb = await Department.findAll({
        where: whereClause,
        include: includeClause,
    });

    if (!departmentDb)
        return res.status(404).json({ message: "Departments not found" });
    return res.json(departmentDb);
}


export async function getDepartmentByName(req: Request, res: Response) {
    const { name } = req.params; // Get params
    const { cityBegginWith } = req.query; // Get query params
    const includeClause: any = {
        model: City,
    } // Include clause

    // @ts-ignore
    if (cityBegginWith) includeClause.where = { name: { [Op.like]: `${cityBegginWith.toLowerCase()}%` } };
    
    const department = await Department.findAll({
        where: { name: name.toLowerCase() },
        include: includeClause
    });

    if (!department)
        return res
            .status(404)
            .json({ message: "Department or cities not found" });
            
    return res.json(department);
}
