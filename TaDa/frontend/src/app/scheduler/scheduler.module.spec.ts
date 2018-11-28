import { SchedulerModule } from './scheduler.module';

describe('SchedulerModule', () => {
  let schedulerModule: SchedulerModule;

  beforeEach(() => {
    schedulerModule = new SchedulerModule();
  });

  it('should create an instance', () => {
    expect(schedulerModule).toBeTruthy();
  });
});
