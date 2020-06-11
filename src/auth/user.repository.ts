import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialsDto: AuthCredentialsDto) {

        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt(10);


        const user = new User();
        user.username = username;
        user.password = await this.hashPassword(password, salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exist');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {

        const { username, password } = authCredentialsDto;
        const user = await User.findOne({ username });
        if (user) {
            const isValid = await this.validatePassword(user.password, password);
            if (isValid) return user.username;
        }
        return null;
    }

    async hashPassword(password: string, salt: any) {
        return await bcrypt.hash(password, salt);
    }

    async validatePassword(hashedPass, password) {
        return await bcrypt.compare(password, hashedPass)
    }
}