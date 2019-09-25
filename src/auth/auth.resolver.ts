import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResult } from './dto/auth-result';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Query(() => AuthResult)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.login({username,  password});
  }

}
