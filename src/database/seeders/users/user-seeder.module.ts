import { Module } from '@nestjs/common';
import { UserSeederService } from './user-seeder.service';
import { UserModule } from '../../../user/user.module';

@Module({
  imports: [UserModule],
  providers: [UserSeederService],
  exports: [UserSeederService],
})
export class UserSeederModule {}
