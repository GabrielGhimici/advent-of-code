declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEV_MODE?: 'enabled' | 'disabled';
      YEAR: string;
      DAY: string;
      F1: string;
      F2: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
