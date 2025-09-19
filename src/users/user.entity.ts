import { IsEnum } from "class-validator";
import { UserRole } from "src/enum/role.enum";



import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  // @Column() // don't really need confirmPassword in DB
  // confirmPassword: string;

  @Column()
  role: UserRole;
}
