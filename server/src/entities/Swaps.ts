import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users } from './Users';
import { Transactions } from './Transactions';

@Index('swapId', ['swapId'], { unique: true })
@Index('swaps_buyer_foreign_idx', ['buyer'], {})
@Index('swaps_seller_foreign_idx', ['seller'], {})
@Entity('swaps', { schema: 'cds_dev2' })
export class Swaps {
  @Column('int', { primary: true, name: 'swapId' })
  swapId: number;

  @Column('int', { name: 'initialAssetPrice' })
  initialAssetPrice: number;

  @Column('int', { name: 'amountOfAssets' })
  amountOfAssets: number;

  @Column('int', { name: 'totalAssets' })
  totalAssets: number;

  @Column('int', { name: 'premium' })
  premium: number;

  @Column('int', { name: 'premiumRate' })
  premiumRate: number;

  @Column('decimal', { precision: 10, scale: 4, name: 'dropRate' })
  dropRate: number;

  @Column('int', { name: 'premiumInterval' })
  premiumInterval: number;

  @Column('int', { name: 'totalPremiumRounds' })
  totalPremiumRounds: number;

  @Column('int', { name: 'sellerDeposit', nullable: true })
  sellerDeposit: number | null;

  @Column('int', { name: 'buyerDeposit', nullable: true })
  buyerDeposit: number | null;

  @Column('int', { name: 'claimPrice' })
  claimPrice: number;

  @Column('int', { name: 'liquidationPrice' })
  liquidationPrice: number;

  @Column('varchar', { name: 'status', nullable: true, length: 20 })
  status: string | null;

  @Column('varchar', { name: 'updatableStatus', nullable: true, length: 20 })
  updatableStatus: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @Column('varchar', { name: 'seller', nullable: true, length: 100 })
  seller: string | null;

  @Column('varchar', { name: 'buyer', nullable: true, length: 100 })
  buyer: string | null;

  @ManyToOne(() => Users, (users) => users.swaps, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'buyer', referencedColumnName: 'address' }])
  buyer2: Users;

  @ManyToOne(() => Users, (users) => users.swaps2, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'seller', referencedColumnName: 'address' }])
  seller2: Users;

  @OneToMany(() => Transactions, (transactions) => transactions.swap)
  transactions: Transactions[];
}
