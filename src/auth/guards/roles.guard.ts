import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private roles: string[] | null) {
    super();
  }

  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  public handleRequest(err, user, info) {
    if (err) {
      throw err;
    }

    if (!this.roles) {
      return user || null;
    }

    const role = user.role;
    const doesRoleMatch = this.roles.some((r) => r === role);

    if (!doesRoleMatch) {
      throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN);
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
