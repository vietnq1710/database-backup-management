import { FileStorageType } from 'src/common/constants/enums/constants';
import { getEnv } from 'src/common/utils/getenv.util';

export enum Environment {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEVELOPMENT = 'development',
}

export interface Configuration {
  server: {
    env: Environment;
    name: string;
    port: number;
    address: string;
    documentPath: string;
    microserviceDocumentPath: string;
    documentAuthUser: string;
    documentAuthPassword: string;
    defaultAdminUsername: string;
    defaultAdminPassword: string;
    defaultFileStorage: FileStorageType;
    gwAddress?: string;
    gwApiKey?: string;
    cron: boolean;
    timezone: string;
    proxy: boolean;
    logSystem: boolean;
  };
}

export default (): Configuration => {
  const serverPort = Number(getEnv('SERVER_PORT')) || 3000;
  const server: Configuration['server'] = {
    env: getEnv('SERVER_ENV', Environment.DEVELOPMENT) as Environment,
    name: getEnv('SERVER_NAME'),
    address: getEnv('SERVER_ADDRESS', `http://localhost:${serverPort}`),
    port: serverPort,
    documentPath: getEnv('SERVER_DOCUMENT_PATH', 'api'),
    microserviceDocumentPath: getEnv(
      'SERVER_MICROSERVICE_DOCUMENT_PATH',
      'microservice/api',
    ),
    documentAuthUser: getEnv('SERVER_DOCUMENT_AUTH_USER', 'user'),
    documentAuthPassword: getEnv('SERVER_DOCUMENT_AUTH_PASSWORD', 'password'),
    defaultAdminUsername: getEnv('SERVER_DEFAULT_ADMIN_USERNAME', 'admin'),
    defaultAdminPassword: getEnv('SERVER_DEFAULT_ADMIN_PASSWORD', 'admin'),
    defaultFileStorage: getEnv(
      'SERVER_DEFAULT_FILE_STORAGE',
      'Database',
    ) as FileStorageType,
    gwAddress: getEnv('SERVER_GW_ADDRESS'),
    gwApiKey: getEnv('SERVER_GW_API_KEY'),
    cron: getEnv('SERVER_CRON', '1') === '1',
    timezone: getEnv('SERVER_TIMEZONE', 'Asia/Ho_Chi_Minh'),
    proxy: getEnv('SERVER_PROXY', '0') === '1',
    logSystem: getEnv('SERVER_LOG_SYSTEM', '0') === '1',
  };
  return { server };
};
