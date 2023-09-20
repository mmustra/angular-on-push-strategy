import {
  cloneDeep,
  flow,
  isObject,
  isUndefined,
  map,
  partialRight,
  remove,
} from 'lodash-es';

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LogService {
  log(...message: any[]): void;
  log(type: LogType, title: string, ...message: any[]): void {
    if (!LogService.isLogType(type)) {
      const others = isUndefined(title) ? [] : [title, ...message];
      console.log(type, ...others);

      return;
    }

    const data = LogService.extractData(message);
    const logStyle = LogService.getLogStye(type);
    const messageText = `%c${type}%c${title}%c${message.join(' ')}`;

    console.log(messageText, logStyle, titleStyle, bodyStyle);

    if (data.length) {
      console.log('└─', ...data);
    }
  }

  break(): void {
    const line = '-'.repeat(30);
    this.log(line);
  }

  newLine(): void {
    this.log('\n');
  }

  private static extractData(message: any[]): any[] {
    return flow(
      partialRight(remove, (item) => isObject(item)),
      partialRight(map, (item) => cloneDeep(item))
    )(message);
  }

  private static getLogStye(logType: LogType): string {
    let logStyle = '';

    switch (logType) {
      case LogType.Click: {
        logStyle = clickStyle;
        break;
      }
      case LogType.Check: {
        logStyle = checkStyle;
        break;
      }
      case LogType.Changes: {
        logStyle = changesStyle;
        break;
      }
      case LogType.Render: {
        logStyle = renderStyle;
        break;
      }
      default: {
        throw new Error(`Unknown style type: ${logType}`);
      }
    }

    return logStyle;
  }

  private static isLogType(value: string): value is LogType {
    return Object.values<string>(LogType).includes(value);
  }
}

export enum LogType {
  Click = 'CLICK',
  Check = 'CHECK',
  Changes = 'CHANGES',
  Render = 'RENDER',
}

const marginStyle = 'margin-left: 1ch;';
const cardStyle = 'padding: 4px; border-radius: 2px;';
const logColor = `color: #ddd;`;
const titleColor = `color: #000;`;
const bodyColor = `color: #999;`;

const clickStyle = `${cardStyle}${logColor}background: #008000;`;
const checkStyle = `${cardStyle}${logColor}background: #000080;`;
const changesStyle = `${cardStyle}${logColor}background: #800000;`;
const renderStyle = `${cardStyle}${logColor}background: #808000;`;
const titleStyle = `${cardStyle}${marginStyle}${titleColor}background: #bbb;`;
const bodyStyle = `${marginStyle}${bodyColor}`;
