import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountsService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = (await this.accountService.findByEmail(email));

    if (user && (await bcrypt.compare(password, user.password))) {
      return { 
        id: user.id, 
        email: user.email ,
        userType: user.userType
      };
    }
    
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { 
        id: user.id,
        userType: user.userType
      }
    };
  }
}
