import {Sequelize} from 'sequelize-typescript';

// var sqlConfig = {
//   userName: 'sa', //username created from SQL Management Studio
//   password: 'Mohamed',
//   server: 'EPL-001',    //the IP of the machine where SQL Server runs

//   options: {
//       instanceName: 'MSSQLSERVER',
//       database: 'wallet',  //the username above should have granted permissions in order to access this DB.
//       debug: {
//           packet: false,
//           payload: false,
//           token: false,
//           data: false
//       },
//       //encrypt: true
//   }

// };

// export const sequelize = new Sequelize({
//   dialect: 'mssql',
//   database: 'wallet',
//   host:'EPL-001',
//   username: 'sa',
//   password: 'Mohamed',
//   storage: ':memory:',

  

//   models: [__dirname + '/sequelize_models'],
//   modelMatch: (filename, member) => {
//     return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
//   },
// });

// export const sequelize = new Sequelize('wallet', 'moh', '123', {
//   host: 'EPL-001',
//   dialect: 'mssql' 
// });


export const sequelize = new Sequelize(
  'wallet', 'sa', 'Mohamed', {
    dialect: 'mssql',
    host: 'localhost', //This is an IP
    dialectOptions: {
      options: {
        port:1433,
        trustServerCertificate: true
      }, 
    },

    models: [__dirname + '/sequelize_models'],
    modelMatch: (filename, member) => {
      return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    }
  },

);




// sequelize.addModels([__dirname + '/**/*.model.ts'])