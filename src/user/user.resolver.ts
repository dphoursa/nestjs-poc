import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './dto/user.dto';
import { UserInput } from './dto/input-user.input';
import { UserService } from './user.service';
import { CurrentUser } from './user.decorator';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { GqlRolesGuard } from '../auth/graphql-roles.guard';
import { Roles } from '../auth/roles.decoraqtor';
import { PaginateInput } from '../common/pagination/paginate.input';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async userHello() {
    return 'hello';
  }

  @Query(returns => User)
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.userService.findOne(user.id);
  }

  @Query(() => [User])
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async users(@Args('paginate') paginate?: PaginateInput) {
    return this.userService.findAll(paginate);
  }

  @Query(() => User)
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async user(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @ResolveProperty(() => Roles)
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async roles(@CurrentUser() user: User): Promise<string[]> {
    return await this.userService.getUserRoleNames(user);
  }

  @Mutation(() => User)
  @Roles('root', 'usermanager')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async createUser(@Args('input') input: UserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  @Roles('root', 'usermanager')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async updateUser(@Args('id') id: string, @Args('input') input: UserInput) {
    return this.userService.update(id, input);
  }

  @Mutation(() => User)
  @Roles('authenticated')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async updateMe(@CurrentUser() user: User, @Args('input') input: UserInput) {
    return this.userService.update(user.id, input);
  }

  @Mutation(() => User)
  @Roles('root', 'usermanager')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async deleteUser(@Args('id') id: string) {
    return this.userService.delete(id);
  }

  @Mutation(() => User)
  @Roles('root', 'usermanager')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async addRoleToUser(
    @Args('roleName') roleName: string,
    @Args('user') userInput: UserInput,
  ) {
    const user = await this.userService.findOne(userInput.email);
    return this.userService.addUserRole(user, roleName);
  }

  @Mutation(() => User)
  @Roles('root', 'usermanager')
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  async removeRoleFromUser(
    @Args('roleName') roleName: string,
    @Args('user') userInput: UserInput,
  ) {
    const user = await this.userService.findOne(userInput.email);
    return this.userService.removeUserRole(user, roleName);
  }
}
