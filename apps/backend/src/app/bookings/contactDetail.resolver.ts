import { ResolveField, Resolver } from '@nestjs/graphql';

@Resolver('ContactDetail')
export class ContactDetailResolver {
  @ResolveField()
  __resolveType(value) {
    if (value['@class'] === 'EmailAddress') {
      return 'EmailAddress';
    }

    return null;
  }
}
