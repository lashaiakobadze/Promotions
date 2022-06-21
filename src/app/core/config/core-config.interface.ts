export interface Configuration {
  environment: Environment;
  global: Global;
}
/**
 * Environment specific endpoints
 */
export interface Environment {
  api: {
    dev: ApiUrl;
    /**
     * No need for prod env. Mock data direcory: e.x.: `./mock_data`
     */
    mock: {
      /**
       * This is indicator that this will be used with backend communication
       */
      enable?: boolean;
      /**
       * Sports Api Url: e.x:`./mock_data`
       */
      path?: string;
      [k: string]: unknown;
    };
  };
}

export interface ApiUrl {
  /**
   * This is indicator that this will be used with backend communication
   */
  enable?: boolean;
  /**
   * This is API address
   */
  path?: string;
  [k: string]: unknown;
}

export interface Global {
  lang: {
    default: string;
    langs: string[];
  };
}
