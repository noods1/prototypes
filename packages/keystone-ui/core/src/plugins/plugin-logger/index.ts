import * as log from 'loglevel';
import { version } from '@src/../package.json';
import { logger, initLogger } from '@src/utils/logger';

import type { LogLevelNames } from 'loglevel';
import type { Plugin } from '@src/plugins';

const LOG_LEVEL_STYLE_MAP = {
  debug: 'color: #87898b',
  info: 'color: #009995',
  warn: 'color: #d2a106',
  error: 'color: #ef504b',
  trace: 'color: #8078f6',
} satisfies Record<LogLevelNames, string>;
const originalFactory = log.methodFactory;

// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
log.setDefaultLevel(process.env.NODE_ENV === 'production' ? log.levels.WARN : log.levels.DEBUG);
// @ts-expect-error methodFactory is a read-only property but loglevel recommends using it
log.methodFactory = (methodName: LogLevelNames, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  return (...messages) => {
    rawMethod(
      `%c[%s] [%s] [%s] - %s`,
      LOG_LEVEL_STYLE_MAP[methodName],
      new Date().toISOString(),
      methodName.toUpperCase(),
      loggerName,
      ...messages,
    );
  };
};
// This should be called in the main entry file because the logger
// should be initalized before the plugin registered.
initLogger('Keystone');

export const pluginLogger = (): Plugin => ({
  name: 'logger',
  install: () => {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    logger.debug(
      `%c\n\n
  ██╗  ██╗███████╗██╗   ██╗███████╗████████╗ ██████╗ ███╗   ██╗███████╗
  ██║ ██╔╝██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔═══██╗████╗  ██║██╔════╝
  █████╔╝ █████╗   ╚████╔╝ ███████╗   ██║   ██║   ██║██╔██╗ ██║█████╗  
  ██╔═██╗ ██╔══╝    ╚██╔╝  ╚════██║   ██║   ██║   ██║██║╚██╗██║██╔══╝  
  ██║  ██╗███████╗   ██║   ███████║   ██║   ╚██████╔╝██║ ╚████║███████╗
  ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚══════╝

                    Current version: v${version}\n`,
      LOG_LEVEL_STYLE_MAP.info,
    );
  },
});
