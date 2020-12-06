import {
  IsString,
  Length,
  IsNotEmpty,
  IsEnum,
  IsEmpty,
  MinLength,
  IsNumber,
  Min,
  IsInt,
  IsNumberString,
  ValidateIf,
  IsMongoId
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ErrorCode } from '../../../constants/error';

export class UserChangeRoleDto {


  @IsMongoId({ message: ErrorCode.ParamsError.MESSAGE })
  @ApiProperty()
  id: string;

  // @IsEnum(UserRole, { message: ErrorCode.ParamsError.MESSAGE })
  @ApiProperty()
  @IsMongoId({ message: ErrorCode.ParamsError.MESSAGE })
  role: string;

}