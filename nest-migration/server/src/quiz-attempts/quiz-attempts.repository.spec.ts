import { Test, TestingModule } from '@nestjs/testing';
import { QuizAttemptsRepository } from './quiz-attempts.repository';
import { DatabaseService } from '../database/database.service';
import { STORAGE } from '../database/database.module';

describe('QuizAttemptsRepository', () => {
  let repository: QuizAttemptsRepository;
  let databaseService: DatabaseService;
  let storage: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizAttemptsRepository,
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

    repository = module.get<QuizAttemptsRepository>(QuizAttemptsRepository);
    databaseService = module.get<DatabaseService>(DatabaseService);
    storage = module.get(STORAGE);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create quiz attempt', async () => {
    const quizAttempt = {
      id: '1',
      userId: 'user1',
      moduleId: 'module1',
      score: 0,
      answers: [],
      completed: false,
    };

    const result = await repository.create(quizAttempt);
    expect(result).toEqual(quizAttempt);
    expect(storage.quizAttempts.get('1')).toEqual(quizAttempt);
  });

  it('should find quiz attempt by id', async () => {
    const quizAttempt = {
      id: '1',
      userId: 'user1',
      moduleId: 'module1',
      score: 0,
      answers: [],
      completed: false,
    };
    storage.quizAttempts.set('1', quizAttempt);

    const result = await repository.findById('1');
    expect(result).toEqual(quizAttempt);
  });

  it('should find quiz attempts by user id', async () => {
    const quizAttempt = {
      id: '1',
      userId: 'user1',
      moduleId: 'module1',
      score: 0,
      answers: [],
      completed: false,
    };
    storage.quizAttempts.set('1', quizAttempt);

    const result = await repository.findByUserId('user1');
    expect(result).toEqual([quizAttempt]);
  });

  it('should update quiz attempt', async () => {
    const quizAttempt = {
      id: '1',
      userId: 'user1',
      moduleId: 'module1',
      score: 0,
      answers: [],
      completed: false,
    };
    storage.quizAttempts.set('1', quizAttempt);

    const updatedQuizAttempt = {
      ...quizAttempt,
      score: 100,
      answers: ['A', 'B', 'C'],
      completed: true,
    };

    const result = await repository.update('1', updatedQuizAttempt);
    expect(result).toEqual(updatedQuizAttempt);
    expect(storage.quizAttempts.get('1')).toEqual(updatedQuizAttempt);
  });
}); 