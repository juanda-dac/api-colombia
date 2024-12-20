import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    NonAttribute
} from "@sequelize/core"

import { Attribute, PrimaryKey, NotNull, Default, BelongsTo } from "@sequelize/core/decorators-legacy"
import {v4} from "uuid"

import { Department } from "./Department"

export class City extends Model<InferAttributes<City>, InferCreationAttributes<City>>{

    @Attribute(DataTypes.UUID)
    @PrimaryKey
    @Default(v4())
    declare id: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string;

    @BelongsTo(() => Department, 'departmentId')
    declare department: NonAttribute<Department>;

    @Attribute(DataTypes.UUID)
    @NotNull
    declare departmentId: string;

}