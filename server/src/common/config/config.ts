interface Config {
  app: { shopName: string; shopMail: string; };
  server: { serverPort: string };
  mongodb: { mongoURI: string; dbName: string };
  sendgrid: { apiKey: string; }
  token: { 
    loginSecret: string;
    loginExpire: string;
    resetSecret: string;
    resetExpire: string;
    activationSecret: string;
    activationExpire: string;
  }
}

const config: Config = {
  app: {
    shopName: 'Wind And Wave Kitesurfing Onlineshop',
    shopMail: 'windandwave.onlineshop@gmail.com'
  },

  server: {
    serverPort: process.env.SERVER_PORT || '',
  },
  
  mongodb: {
    mongoURI:   process.env.MONGO_URI      || '',
    dbName:     process.env.MONGO_APP_DATABASE || '',
  },

  sendgrid: {
    apiKey: 'SG.xyz' // process.env.SENDGRID_APIKEY || '',
  },

  token: {
    loginSecret:        process.env.TOKEN_LOGIN_SECRET      || '',
    loginExpire:        process.env.TOKEN_LOGIN_EXPIRE      || '',
    
    resetSecret:        process.env.TOKEN_RESET_SECRET      || '',
    resetExpire:        process.env.TOKEN_RESET_EXPIRE      || '',
    
    activationSecret:   process.env.TOKEN_ACTIVATION_SECRET || '',
    activationExpire:   process.env.TOKEN_ACTIVATION_EXPIRE || '',
  },
};

export { config };