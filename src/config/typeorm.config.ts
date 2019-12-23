import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'taskmanagement',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}