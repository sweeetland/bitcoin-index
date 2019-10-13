import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index
} from 'typeorm';

@Entity()
export class OPReturn extends BaseEntity {
  public constructor(data?) {
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
