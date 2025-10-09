export default class Result<D = any, E = Error | unknown> {
  readonly data: D | null;
  readonly error: E | null;
  readonly success: boolean;

  constructor(options: { data?: D; error?: E; success?: boolean } = {}) {
    this.data = options.data ?? null;
    this.error = options.error ?? null;
    this.success = options.success ?? true;
  }
}
