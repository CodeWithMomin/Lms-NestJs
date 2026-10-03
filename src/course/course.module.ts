import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
AuthModule,JwtModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
