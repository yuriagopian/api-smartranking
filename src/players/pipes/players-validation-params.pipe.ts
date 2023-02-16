import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class PlayersValidationParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`value: ${value} metadata: ${metadata.type}`);

    return value;
  }
}
