import { Request, Response } from "express";
import { sequelize } from "../db/db";
import City from "../models/City";
import Department from "../models/Department";

import { Op } from "@sequelize/core";

export async function getDepartments(req: Request, res: Response){

    // /api/v1?name=antioquia&begginWith=med

    const departments = await Department.findAll({ include: City });
    res.json(departments);
}

export async function getDepartmentByName(req: Request, res: Response){
    const { name } = req.params;
    // Get query params
    const { cityBegginWith } = req.query;
    if(!cityBegginWith) {
        const department = await Department.findOne({ where: { name:name.toLowerCase() }, include: City });
        res.json(department);
        return;
    }
    // Get department and his cities that start with the query param
    // @ts-ignore
    const department = await Department.findOne({ where: { name: name.toLowerCase() }, include: { model: City, where:{ name:{[Op.like]:`${cityBegginWith.toLowerCase()}%`}}}});
    if(!department) return res.status(404).json({ message: "Department or cities not found" });
    return res.json(department);
    
}