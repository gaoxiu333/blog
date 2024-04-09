import { Injectable } from '@nestjs/common';
import { StacksService } from 'src/stacks/stacks.service';
import * as _ from 'lodash';
// TODO: dayjs 的国际化 失败了，不知道是不是ts的原因
// dayjs.locale('zh-cn');
// dayjs.extend(relativeTime);

@Injectable()
export class StacklistService {
  constructor(private sService: StacksService) {}

  findAll() {
    return `This action returns all stacklist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stacklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} stacklist`;
  }

  async getRandomStack(m = 5) {
    const data = await this.sService.getAllStack();
    return _.take(_.shuffle(data), m);
  }
}
