import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index
} from 'typeorm';

@Entity()
export class OPReturn extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index({ where: `"blockheight" > 1000000` })
  @Column()
  body: string;

  @Column()
  txhash: string;

  @Column({ nullable: true })
  blockhash?: string | undefined;

  @Column({ nullable: true })
  blockheight?: number | undefined;
}
