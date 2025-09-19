import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Data2 extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  IPD: number;

  @Column({ type: 'int', nullable: true })
  Accident: number;

  @Column({ type: 'int', nullable: true })
  Total_sum_insured: number;

  @Column({ type: 'int', nullable: true })
  Age_less_than_equal_to_20_yrs: number;

  @Column({ type: 'int', nullable: true })
  Age_is_21_to_35_yrs: number;

  @Column({ type: 'int', nullable: true })
  Age_is_36_to_45_yrs: number;

  @Column({ type: 'int', nullable: true })
  Age_is_46_to_55_yrs: number;

  @Column({ type: 'int', nullable: true })
  Age_is_56_to_60_yrs: number;

  @Column({ type: 'int', nullable: true })
  Age_is_61_to_70_yrs: number;

  @Column({ type: 'int', nullable: true })
  Age_is_71_to_80_yrs: number;

  @Column({ type: 'int', nullable: true })
  Age_is_above_80_yrs: number;
}
