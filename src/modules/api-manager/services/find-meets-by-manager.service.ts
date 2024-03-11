import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class FindMeetsByManagersService {
    constructor(private prisma: PrismaService) {}
    async execute(managerId: string) {
        try {
            const meets = await this.prisma.meet.findMany({
                where: { manager_id: managerId },
            });

            const { name } = await this.prisma.manager.findFirst({
                where: { id: managerId },
            });

            if (!name) {
                throw new HttpException(
                    'O organizador não foi encontrado!',
                    HttpStatus.BAD_REQUEST,
                );
            }

            if (meets.length > 1) {
                const result = [];
                for (const meet of meets) {
                    result.push({
                        name: meet.title,
                        summary: meet.summary,
                        date: meet.datetime,
                        manager: name,
                    });
                }
                return result;
            }

            return {
                name: meets[0].title,
                summary: meets[0].summary,
                date: meets[0].datetime,
                manager: name,
            };
        } catch (error) {
            throw new HttpException(
                'Erro inesperado do servidor.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
