const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUwzQmdwcFR2N0lzTjZQeTBrU09waktVdThpVGNuaUJvL2ZraE1CRWdIcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia3RueTgxZkJhS2VKUStjaEZDOWlhS1NRQ1lqNjNXVVlTMVRJSWprQkMxYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzR3p1SkhTZlF4cnhQVTlZZGlzUDhpT21mamMvcHNEajVpMjloTjZxSkZFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWWJ6WXY1cUdxa1Q4TDZDbmR2dng2Z1BlUDVpUUVVY3ZqV0EyU3YzeGw4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1ILzBBT3VjVTdDN3JEdS9lQ0pYUmRpQndWZTZJaXovc1hlL3BEUm9hRmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjgrU0JkcEJqUzhxK2hQNTNDYjFLMitFeEJ6NUsxUmZhaGFyVTZWWjJsUms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUFtdHBkT3REcTFmRlVhNzJsV2RkVWkzUXdpUEZoSVBrMGtGQ3NRYU1Idz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaG84ZldwWkU1L0p0U3B3NW1qOTJMK2U2VEZLcEVtRWd2aHVmcjAxUUJHZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpXcjIwVENGbXpjeDVCUGJkRndENVRLVi84TDRncGovSjJQWk1JSUNFZUc3d1ZFUzhaNWc2TFZITVNySFgxa0dzQUNrRkdRV1lQL0tJOGNlemgwQmpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg2LCJhZHZTZWNyZXRLZXkiOiJmYm5uRWw4dWFHY3ptQUx1cHBpVUlaNlkvNTZzbkNrRkJ1UTdiWE8wYTRrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJbVF0cHBGcFJyQ2xZZWdQVGNOeEdRIiwicGhvbmVJZCI6IjFmMWExZTZkLTg0NmEtNGY2MS1hNThmLTYwOTk4YjhmYmY1NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRVVFOczNxTHNDeEpvQVhuZUFVbDNkYVdrVUU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidjMvclMycnFUb1pCN1paOTlFM01XQ0dtSlB3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRPWElDVEVDIiwibWUiOnsiaWQiOiIyNjM3MTk0OTUwNjc6NTdAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI4MDI1NjMxMjU4NjI4NDo1N0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ00rUjJJb0JFTXJ6OU1JR0dCUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjBidzJKUWdzK1g2MVNJZkF0RkU0UE1WcnZzZ1VTU29JWDRHTFJGakY4aU09IiwiYWNjb3VudFNpZ25hdHVyZSI6IkZMTWNDMnltNlprZmNYZENpTjlMUXg4T0hjUTNhb2ExLzFhNWUvMkpLTHpNRDRxVENZRVA0Y1pISWZ2V2dudjBFMVpBallsZlZiOGN0MjBwTWJKWUJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJua29tRGw4S01SdHE4RENDUHZiMU44RTdUK1NSS3EzS0NaakhBdTRaMTR0Vlh3MUFSNkphT0J5clVGUU96Vi9DMWFrYkhuTmw2b2E3WW5va0FkRllnZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxOTQ5NTA2Nzo1N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkRzhOaVVJTFBsK3RVaUh3TFJST0R6RmE3N0lGRWtxQ0YrQmkwUll4ZklqIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTA5NDAxMjAsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRFVsIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Njabulo Jb",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Njabulo Jb",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Njabulo-Jb',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/nw8nva.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
