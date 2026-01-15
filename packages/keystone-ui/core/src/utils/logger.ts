import { getLogger } from 'loglevel';

/**
 * Global logger instance.
 *
 * @example
 * import { logger } from '@src/utils/logger';
 *
 * logger.debug('debug message');
 * logger.info('info message');
 * logger.warn('warn message');
 * logger.error('error message');
 *
 * @link For detailed documentation, please refer to [loglevel](https://github.com/pimterry/loglevel).
 */
// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
export let logger = process.env.NODE_ENV === 'test' ? getLogger('test') : undefined;

export const initLogger = (name: string | symbol) => {
  if (!logger) logger = getLogger(name);
};
