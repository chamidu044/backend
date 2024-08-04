import { DataSource,DataSourceOptions } from "typeorm";
export const dataSourceOptions:DataSourceOptions={
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'meeting-room-booking-sys',
    entities: ['dist/**/*.entity[.ts,.js]'],
    synchronize: true,
}

const dataSource=new DataSource(dataSourceOptions);

export default dataSource;