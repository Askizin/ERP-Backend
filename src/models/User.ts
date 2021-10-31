import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Permission } from './Permission';
import { Role } from './Role';

@Entity('users')
class User extends BaseEntity {

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @ManyToMany(() => Role)
    @JoinTable({
        name: "users_roles",
        joinColumns: [{ name: "user_id",}],
        inverseJoinColumns: [{ name: "role_id",}]
    })
    roles: Role[];

    @ManyToMany(() => Permission)
    @JoinTable({
        name: "users_permissions",
        joinColumns: [{name: "user_id"}],
        inverseJoinColumns: [{name: "permissions_id"}]
    })
    permissions: Permission[];
}
export { User };
