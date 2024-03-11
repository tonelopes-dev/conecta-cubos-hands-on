import { sign, decode, JwtPayload } from 'jsonwebtoken';
import { PrismaService } from '../providers/prisma.service';

console.log('Starting seed script for populating the database...\n');

const prisma = new PrismaService();

async function createManager() {
  try {
    const { id: admin_id } = await prisma.admin.findFirst();
    const manager = await prisma.manager.create({
      data: {
        admin_id,
        name: 'José Bonifácio',
        email: 'zeboninho@republica.com.br',
        token: 'not valid',
        token_expiration_time: '2024-02-29T12:00:00Z',
      },
    });
    const token_valid = sign({ id: manager.id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    const decodedToken = decode(token_valid, {
      complete: true,
    }) as JwtPayload;

    if (decodedToken && typeof decodedToken.payload.exp !== 'undefined') {
      const expirationDate = new Date(decodedToken.payload.exp * 1000);
      const updatedManager = await prisma.manager.update({
        where: { id: manager.id },
        data: {
          token: token_valid,
          token_expiration_time: expirationDate,
        },
      });
      console.log('Manager created:', updatedManager, '\n');
    }
  } catch (error) {
    console.error('Got an error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function createMeet() {
  try {
    const { id: admin_id } = await prisma.admin.findFirst();
    const { id: manager_id } = await prisma.manager.findFirst();

    const meet = await prisma.meet.create({
      data: {
        admin_id,
        manager_id,
        title: '3 caminhos para se tornar um milionário!',
        summary: 'Comece a ganhar dinheiro e ganhe mais!',
        datetime: new Date('2024-05-10T12:00:00Z'),
        address: 'Rua dos Bobos',
        address_number: '0',
        address_zip: '00000-000',
        address_city: 'Cidade do Zeboninho',
        address_state: 'RJ',
        address_district: 'Zeboninho',
        start_time: new Date('2024-05-10T12:00:00Z'),
        end_time: new Date('2024-05-10T12:30:00Z'),
      },
    });

    console.log('Meet created:', meet, '\n');
  } catch (error) {
    console.error('Got an error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function createLecture() {
  try {
    const { id } = await prisma.meet.findFirst();

    const lecture1 = await prisma.lecture.create({
      data: {
        meet_id: id,
        speaker_name: 'Silvio Santos',
        speaker_about: 'O dono do baú',
        speaker_email: 'alan360gabriel@gmail.com',
        title: 'Quem quer dinheiro?',
        description: 'Como fazer aviõezinhos de 100 reais',
        datetime: new Date('2024-05-10T12:00:00Z'),
        status: 'pending',
      },
    });

    const lecture2 = await prisma.lecture.create({
      data: {
        meet_id: id,
        speaker_name: 'Jeff Bezos',
        speaker_about: 'Amazon King',
        speaker_email: 'jeff@bezos.aws',
        title: 'Start selling today!',
        description: 'From zero to a million in one year.',
        datetime: new Date('2024-05-10T12:30:00Z'),
        status: 'pending',
      },
    });

    console.log('Lectures created:', lecture1, '\n', lecture2, '\n');
  } catch (error) {
    console.error('Got an error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function main(): Promise<void> {
  await createManager();
  await createMeet();
  await createLecture();
}

main();
