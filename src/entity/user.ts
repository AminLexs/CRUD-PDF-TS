import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ColumnType } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: "varchar",length: "255", unique: true })
    email: string;

    @Column({ type: "varchar", length: "230" })
    firstName: string;

    @Column("text") lastName: string;

    @Column() image: string;

    @Column("binary") pdf: string; ;
}