import { HttpAdapterHost } from '@nestjs/core';
import { ExceptionHandlingFilter } from './exception-handling.filter';

describe('ExceptionHandlingFilter', () => {
   it('should be defined', () => {
      const mockHttpAdapterHost = { httpAdapter: {} } as HttpAdapterHost;
      expect(new ExceptionHandlingFilter(mockHttpAdapterHost)).toBeDefined();
   });
});
