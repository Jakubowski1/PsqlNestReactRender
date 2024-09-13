import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './visit.entity';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visit]),  forwardRef(() => UserModule),
  ],
  providers: [VisitService],
  controllers: [VisitController],
  exports: [VisitService], 
})
export class VisitModule {}
