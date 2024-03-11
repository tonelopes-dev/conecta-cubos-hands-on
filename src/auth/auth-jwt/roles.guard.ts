import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //console.log('entered roles.guard');

    const roles = this.reflector.get<string[]>(Roles, context.getHandler());
    console.log('roles:', roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { user } = request.body;
    console.log('user:', user);

    if (!user || !user.role) {
      //console.log('blocked on if of roles.guard');
      return false;
    }

    return matchRoles(roles, user.role);
  }
}

export const matchRoles = (
  requiredRoles: string[],
  userRoles: string[],
): boolean => {
  console.log('user role at matchRoles:', userRoles);
  if (!userRoles || userRoles.length === 0) {
    //console.log('blocked on if of matchRoles');
    return false; // Se o usuário não tiver funções, não há correspondência
  }

  // Verificar se há uma interseção entre as funções necessárias e as funções do usuário
  const intersection = requiredRoles.some((role) => userRoles.includes(role));
  console.log('intersection:', intersection);

  return intersection;
};
