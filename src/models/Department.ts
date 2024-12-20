import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    NonAttribute
} from "@sequelize/core";
import { Attribute, PrimaryKey, NotNull, Default, HasMany } from "@sequelize/core/decorators-legacy";

import { v4 } from "uuid";
import { City } from "./City";


export class Department extends Model<InferAttributes<Department>, InferCreationAttributes<Department>> {
    @Attribute(DataTypes.UUID)
    @PrimaryKey
    @Default(v4())
    declare id: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string;

    @HasMany(() => City, 'departmentId')
    declare cities: NonAttribute<City[]>;

}

