import { Entry } from '../../entities/entities/entity.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @OneToMany(() => Entry, (entry) => entry.category)
  entries: Entry[];
}
