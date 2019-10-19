import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index
} from 'typeorm'

@Entity()
@Index('body_idx', { synchronize: false })
export default class OPReturn extends BaseEntity {
  public constructor(data: any) {
    super()
    if (data) {
      this.body = data.body
      this.txhash = data.txhash
      this.blockhash = data.blockhash
      this.blockheight = data.blockheight
    }
  }

  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  body: string

  @Column()
  txhash: string

  @Column()
  blockhash: string

  @Column()
  blockheight: number
}
