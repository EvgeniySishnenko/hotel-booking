import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '../decorators/roles.guard';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  // public canActivate(context: ExecutionContext) {
  //   return super.canActivate(context);
  // }
  constructor(this.super()) {}
  public handleRequest(err, user, info) {
    if (err) {
      throw err;
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  // constructor(private reflector: Reflector) {}

  // canActivate(context: ExecutionContext): boolean {
  //   const roles = this.reflector.getAllAndOverride(ROLES_KEY, [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);
  //   if (!roles) {
  //     return true;
  //   }
  //   const request = context.switchToHttp().getRequest();
  //   const user = request.user;
  //   console.log(roles, user);

  //   // return matchRoles(roles, user.roles);
  // }
}
