import { Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemon.response';
import { PokemonService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
})
export default class PokemonPageComponent implements OnInit {
  private pokemonService = inject(PokemonService);

  private title = inject(Title);
  private meta = inject(Meta);

  private route = inject(ActivatedRoute);
  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pokemonService
      .loadPokemon(id)
      .pipe(
        tap(({ name, id }) => {
          this.title.setTitle(`#${id} - ${name}`);
          this.meta.updateTag({
            name: 'description',
            content: `Pokemon page ${name}`,
          });
          this.meta.updateTag({
            name: 'og:title',
            content: `#${id} - ${name}`,
          });
          this.meta.updateTag({
            name: 'og:description',
            content: `Pokemon page ${name}`,
          });

          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
        }),
      )
      .subscribe(this.pokemon.set);
  }
}
