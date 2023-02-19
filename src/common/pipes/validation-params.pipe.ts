import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ValidationParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // @IsEmail(undefined)
    // value;
    // Validate if value is valid
    if (!value) {
      throw new BadRequestException(
        `The value of param ${metadata.data} must be informed!`,
      );
    }
    console.log(`value: ${value} metadata: ${metadata.type}`);

    return value;
  }
}
