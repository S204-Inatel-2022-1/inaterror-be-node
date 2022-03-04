declare global {
    namespace NodeJS {
      interface ProcessEnv {
        CONNECTION_STR: string;
        PORT?: string;
      }
    }
  }