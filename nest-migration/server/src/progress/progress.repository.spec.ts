import { Test, TestingModule } from '@nestjs/testing';
import { ProgressRepository } from './progress.repository';
import { DatabaseService } from '../database/database.service';
import { STORAGE } from '../database/database.module';

describe('ProgressRepository', () => {
  let repository: ProgressRepository;
  let databaseService: DatabaseService;
  let storage: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgressRepository,
        DatabaseService,
        {
          provide: STORAGE,
          useValue: {
            users: new Map(),
            progress: new Map(),
            quizAttempts: new Map(),
          },
        },
      ],
    }).compile();

    repository = module.get<ProgressRepository>(ProgressRepository);
    databaseService = module.get<DatabaseService>(DatabaseService);
    storage = module.get(STORAGE);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create progress', async () => {
    const progress = {
      id: '1',
      userId: 'user1',
      moduleId: 'module1',
      completed: false,
      score: 0,
    };

    const result = await repository.create(progress);
    expect(result).toEqual(progress);
    expect(storage.progress.get('1')).toEqual(progress);
  });

  it('should find progress by id', async () => {
    const progress = {
      id: '1',
      userId: 'user1',
      moduleId: 'module1',
      completed: false,
      score: 0,
    };
    storage.progress.set('1', progress);

    const result = await repository.findById('1');
    expect(result).toEqual(progress);
  });

  it('should find progress by user id', async () => {
    const progress = {
      id: '1',
      userId: 'user1',
      moduleId: 'module1',
      completed: false,
      score: 0,
    };
    storage.progress.set('1', progress);

    const result = await repository.findByUserId('user1');
    expect(result).toEqual([progress]);
  });

  it('should update progress', async () => {
    const progress = {
      id: '1',
      userId: 'user1',
      moduleId: 'module1',
      completed: false,
      score: 0,
    };
    storage.progress.set('1', progress);

    const updatedProgress = {
      ...progress,
      completed: true,
      score: 100,
    };

    const result = await repository.update('1', updatedProgress);
    expect(result).toEqual(updatedProgress);
    expect(storage.progress.get('1')).toEqual(updatedProgress);
  });
}); 