import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Recipe } from "./recipe.model";
import { RecipesResolver } from "./recipe.resolver";
import { RecipesService } from "./recipe.service";

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  providers: [RecipesResolver, RecipesService],
})
export class RecipesModule {}
