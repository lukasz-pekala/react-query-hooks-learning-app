import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { DatabaseService } from '../database/database.service';
import { STORAGE } from '../database/database.module';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let databaseService: DatabaseService;
  let storage: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
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

    repository = module.get<UsersRepository>(UsersRepository);
    databaseService = module.get<DatabaseService>(DatabaseService);
    storage = module.get(STORAGE);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {
      id: '1',
      username: 'testuser',
      password: 'hashedpassword',
      email: 'test@example.com',
    };

    const result = await repository.create(user);
    expect(result).toEqual(user);
    expect(storage.users.get('1')).toEqual(user);
  });

  it('should find a user by id', async () => {
    const user = {
      id: '1',
      username: 'testuser',
      password: 'hashedpassword',
      email: 'test@example.com',
    };
    storage.users.set('1', user);

    const result = await repository.findById('1');
    expect(result).toEqual(user);
  });

  it('should find a user by username', async () => {
    const user = {
      id: '1',
      username: 'testuser',
      password: 'hashedpassword',
      email: 'test@example.com',
    };
    storage.users.set('1', user);

    const result = await repository.findByUsername('testuser');
    expect(result).toEqual(user);
  });

  it('should find a user by email', async () => {
    const user = {
      id: '1',
      username: 'testuser',
      password: 'hashedpassword',
      email: 'test@example.com',
    };
    storage.users.set('1', user);

    const result = await repository.findByEmail('test@example.com');
    expect(result).toEqual(user);
  });
}); 