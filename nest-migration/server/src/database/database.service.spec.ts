import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { STORAGE } from './database.module';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let storage: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<DatabaseService>(DatabaseService);
    storage = module.get(STORAGE);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get storage', () => {
    const result = service.getStorage();
    expect(result).toBeDefined();
    expect(result.users).toBeDefined();
    expect(result.progress).toBeDefined();
    expect(result.quizAttempts).toBeDefined();
  });

  it('should run in transaction', async () => {
    const callback = jest.fn();
    await service.runInTransaction(callback);
    expect(callback).toHaveBeenCalledWith(storage);
  });
}); 