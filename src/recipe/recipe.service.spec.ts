import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../loaders/database/database.module';
import { recipeProviders } from './recipe.providers';
import { RecipesService } from './recipe.service';

describe('ProductService', () => {
  let service: RecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [DatabaseModule],
        providers: [
          RecipesService,
          ...recipeProviders,
        ],
    }).compile();
    service = module.get<RecipesService>(RecipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});