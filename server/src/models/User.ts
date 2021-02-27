import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  imagePath: string;

  @Column()
  level: number;

  @Column()
  currentExperience: number;

  @Column()
  challengesCompleted: number;
}
