import { Controller, Post, Body, UseGuards, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { InvalidCredentialsException, RegistrationFailedException, InternalServerErrorException } from '../exceptions/custom-exceptions';  


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  // constructor(
  //   private readonly authService: AuthService,
  // ) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // @ApiOperation({ summary: 'Log in' })
  // @ApiBody({ type: LoginDto })
  // async login(@Request() req, @Response() res) {
  //   try {
  //     const { token, user } = await this.authService.login(req.user);
  //     res.cookie('jwt', token, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production', 
  //     });
  //     return res.send(user);
  //   } catch (error) {
  //     throw new InvalidCredentialsException();
  //   }
  // }

  // @Post('register')
  // @ApiOperation({ summary: 'Register a new user' })
  // @ApiBody({ type: User })
  // async register(@Body() user: User) {
    
  //   const newUser = await this.authService.register(user);
  //   if (!newUser) {
  //     throw new RegistrationFailedException();
  //   }
  //   return newUser;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('logout')
  // @ApiOperation({ summary: 'Log out' })
  // async logout(@Request() req, @Response() res) {
  //   try {
  //     res.clearCookie('jwt', {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production', 
  //     });
  //     return res.send({ message: 'Logged out successfully' });
  //   } catch (error) {
  //     throw new InternalServerErrorException('An unexpected error occurred during logout');
  //   }
  // }
}
