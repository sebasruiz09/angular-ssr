import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
})
export default class PokemonsPageComponent implements OnInit, OnDestroy {
  private title = inject(Title);
  private pokemonService = inject(PokemonService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
  );

  //private appRef = inject(ApplicationRef);

  //private $appState = this.appRef.isStable.subscribe((isStable) => {
  //console.log({ isStable });
  //});

  ngOnInit(): void {
    this.loadPokemons();
    //setTimeout(() => {
    //this.isLoading.set(false);
    //}, 1500);
  }

  public loadPokemons(page = 0): void {
    const pageToLoad = this.currentPage()! + page;
    this.pokemonService
      .loadPage(pageToLoad)
      .pipe(
        tap(() =>
          this.router.navigate([], { queryParams: { page: pageToLoad } }),
        ),
        tap(() => this.title.setTitle(`PokedexSSR - Page ${pageToLoad}`)),
      )
      .subscribe(this.pokemons.set);
  }

  ngOnDestroy(): void {
    //this.$appState.unsubscribe();
  }
}
