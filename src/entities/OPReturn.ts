import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index
} from 'typeorm';
import { BLOCKHEIGHT_INDEX } from '../config/env';

@Entity()
export default class OPReturn extends BaseEntity {
  public constructor(data: any) {
    super();
    if (data) {
      this.body = data.body;
      this.txhash = data.txhash;
      this.blockhash = data.blockhash;
      this.blockheight = data.blockheight;
    }
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Index({ where: `"blockheight" > ${BLOCKHEIGHT_INDEX}` })
  @Column()
  body: string;

  @Column()
  txhash: string;

  @Column({ nullable: true })
  blockhash?: string | undefined;

  @Column({ nullable: true })
  blockheight?: number | undefined;
}
