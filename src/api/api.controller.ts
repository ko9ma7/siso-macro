import { Response } from 'express';
import { SisoService } from './siso/siso.service';
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

@Controller('api')
export class ApiController {
    constructor(private readonly sisoService: SisoService) { }

    @Post('siso')
    async execute(@Body() body, @Res() res: Response): Promise<any> {
        try {
            await this.sisoService.checkIsRunnable();

            let result = {};
            result = await this.sisoService.run(body);

            res.status(HttpStatus.CREATED).json(result);
        } catch (e) {
            res.status(e.status).json({ code: e.status, msg: e.message });
        }
    }
}
