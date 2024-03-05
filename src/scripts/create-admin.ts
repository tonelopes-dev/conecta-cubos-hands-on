import * as readline from 'readline';
import { sign } from 'jsonwebtoken';
import { PrismaService } from '../prisma.service';

console.log('Creating admin...');

interface Admin {
  id?: string;
  username: string;
  email: string;
  token?: string;
}

const prisma = new PrismaService();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getUserInput(): Promise<Admin> {
  return new Promise((resolve) => {
    rl.question('Type in your username: ', (username) => {
      rl.question('Type in your email: ', (email) => {
        resolve({ username, email });
        rl.close();
      });
    });
  });
}

async function main() {
  try {
    const user = await getUserInput();
    const admin = await prisma.admin.create({
      data: {
        username: user.username,
        email: user.email,
        token: 'not created',
      },
    });
    console.log('Admin:', admin);
    const token = sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    const updatedAdmin = await prisma.admin.update({
      where: { id: admin.id },
      data: { token },
    });
    //console.log('Admin updated with token:\n', updatedAdmin);

    console.log('Admin created!\n', updatedAdmin);
    //console.log('Admin"s" information:');
    //console.log(`Username: ${admin.username}`);
    //console.log(`Email: ${admin.email}`);
    //console.log(`Token: ${admin}`);
    //console.log(`ID: ${admin.id}`);
  } catch (error) {
    console.error('Got an error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
