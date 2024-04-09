import { Injectable } from '@nestjs/common';
import { projects } from './helper/_constant';
import { PrismaService } from 'src/prisma.service';
import { omit } from 'lodash';
import { fetchNpmDetails } from './helper/npmUtils';
import { fetchGithubInfo } from './helper/githubUtils';

@Injectable()
export class StacksService {
  constructor(private prisma: PrismaService) {}

  async create() {
    await Promise.all(
      projects.map((project) => {
        return this.prisma.stack.upsert({
          where: {
            name: project.name,
          },
          create: {
            ...omit(project, 'tags'),
          } as any,
          update: {
            ...omit(project, 'tags'),
          },
        });
      }),
    );
    await Promise.all(
      projects.map(async (project) => {
        try {
          const npmInfo = await fetchNpmDetails(project);
          const githubInfo = await fetchGithubInfo(project);
          await this.prisma.npm.upsert({
            where: {
              name: project.name,
            },
            create: {
              ...npmInfo,
              tag: project.tag,
            },
            update: {
              ...npmInfo,
              tag: project.tag,
            },
          });
          await this.prisma.github.upsert({
            where: {
              name: project.name,
            },
            create: {
              ...githubInfo,
              tag: project.tag,
            } as any,
            update: {
              ...githubInfo,
              tag: project.tag,
            },
          });
        } catch (error) {
          console.log('error', error);
        }
      }),
    );
    return 'This action adds a new stacklist';
  }
  async getAllStack(tag?: string) {
    const tags = tag?.split(',') || [];
    const stack = await this.prisma.stack.findMany();
    const npm = await this.prisma.npm.findMany();
    const github = await this.prisma.github.findMany();
    const result = stack
      .map((item: any) => ({
        ...item,
        ...github.find((g: any) => g.name === item.name),
        ...npm.find((n: any) => n.name === item.name),
      }))
      .filter((item: any) =>
        tags.length > 0
          ? tags.every((tag: any) => ~item.tag.indexOf(tag))
          : true,
      );

    return result;
  }
}
