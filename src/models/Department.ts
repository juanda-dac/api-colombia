import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    NonAttribute,
    CreationOptional
} from "@sequelize/core";
import { Attribute, PrimaryKey, NotNull, Default, HasMany, Table } from "@sequelize/core/decorators-legacy";

import { v4 } from "uuid";
import City from "./City";

@Table({ timestamps: false })
export default class Department extends Model<InferAttributes<Department>, InferCreationAttributes<Department>> {
    @Attribute(DataTypes.UUID)
    @PrimaryKey
    @Default(() => v4())
    declare id: CreationOptional<string>;

    @Attribute(DataTypes.STRING)
    @NotNull
    get name(): string {
        // First letter to uppercase
        return this.getDataValue('name').charAt(0).toUpperCase() + this.getDataValue('name').slice(1);
    }

    @HasMany(() => City, 'departmentId')
    declare cities: NonAttribute<City[]>;

}

