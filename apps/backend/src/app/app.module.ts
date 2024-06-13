import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { join } from 'path';

import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    BookingsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'apps/backend/src/graphql.ts'),
        outputAs: 'interface',
      },
    }),
  ],
})
export class AppModule {}
