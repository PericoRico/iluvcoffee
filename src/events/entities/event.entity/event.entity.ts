import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

/* Event */
@Index(['type', 'name'])
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column('json')
    payload: Record<string, any>;
}