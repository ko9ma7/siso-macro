import { SisoService } from './siso/siso.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('api')
export class ApiController {
    constructor(private readonly sisoService: SisoService) {}

    @Post('siso')
    async execute(@Body() body): Promise<any> {
        let result = {};

        result = await this.sisoService.run(body);

        return { data: result };
    }
}
