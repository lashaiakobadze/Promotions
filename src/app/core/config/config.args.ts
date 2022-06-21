export interface CoreConfigArgs {
  /**
   * Set true if you need to preload configuration files from json path (`path` parameter is required)
   * False if you need to provide configurations using `data` parameter
   */
  readonly preload: boolean;

  readonly path?: string;

  readonly data?: any;
}
