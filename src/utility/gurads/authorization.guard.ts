import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const allowedRoles = this.reflector.get<string[]>('allowedroles', context.getHandler());

        if (!allowedRoles) {
            throw new UnauthorizedException('No roles are allowed to access this resource.');
        }

        const request = context.switchToHttp().getRequest();
        const userRoles = request?.currentUser?.roles;

        if (!userRoles) {
            throw new UnauthorizedException('User roles not found.');
        }

        const result = userRoles.some((role: string) => allowedRoles.includes(role));

        if (result) return true;

        throw new UnauthorizedException('Sorry, you are not authorized.');
    }
}
