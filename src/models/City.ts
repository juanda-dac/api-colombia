import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    NonAttribute,
    CreationOptional
} from "@sequelize/core"

import { Attribute, PrimaryKey, NotNull, Default, BelongsTo, Table } from "@sequelize/core/decorators-legacy"
import {v4} from "uuid"

import Department from "./Department"


@Table({timestamps:false})
export default class City extends Model<InferAttributes<City>, InferCreationAttributes<City>>{

    @Attribute(DataTypes.UUID)
    @PrimaryKey
    @Default(()=> v4())
    declare id: CreationOptional<string>;

    @Attribute(DataTypes.STRING)
    @NotNull
    get name(): string{
        return this.getDataValue('name').charAt(0).toUpperCase() + this.getDataValue('name').slice(1);
    }

    @BelongsTo(() => Department, 'departmentId')
    declare department: NonAttribute<Department>;

    @Attribute(DataTypes.UUID)
    @NotNull
    declare departmentId: string;

}