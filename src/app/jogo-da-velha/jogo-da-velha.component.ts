import { Component, OnInit } from '@angular/core';
import { JogoDaVelhaService } from './shared';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.css'],
})
export class JogoDaVelhaComponent implements OnInit {
  constructor(private jogodavelhaService: JogoDaVelhaService) {}

  ngOnInit(): void {
    this.jogodavelhaService.iniciar();
  }

  get mostrarInicio(): boolean {
    return this.jogodavelhaService.mostrarInicio;
  }
  get mostrarEscolha(): boolean {
    return this.jogodavelhaService.mostrarEscolha;
  }
  get mostrarTabuleiro(): boolean {
    return this.jogodavelhaService.mostrarTabuleiro;
  }
  get mostrarfinal(): boolean {
    return this.jogodavelhaService.mostrarfinal;
  }
  get mostrarPronto(): boolean {
    return this.jogodavelhaService.mostrarPronto;
  }
  iniciarJogo(): void {
    this.jogodavelhaService.iniciarJogo();
  }
  iniciarEscolha(): void {
    this.jogodavelhaService.iniciarEscolha();
  }
  terminarEscolha(): void {
    this.jogodavelhaService.terminarEscolha();
  }
  umJogador(): void {
    this.jogodavelhaService.umJogador;
  }
  doisJogadores(): void {
    this.jogodavelhaService.doisJogadores;
  }
  jogar(x: number, y: number): void {
    this.jogodavelhaService.jogar(x, y);
  }
  mostrarVitoria(x: number, y: number): boolean {
    return this.jogodavelhaService.mostrarVitoria(x, y);
  }
  mostrarX(x: number, y: number): boolean {
    return this.jogodavelhaService.mostrarX(x, y);
  }
  mostrarO(x: number, y: number): boolean {
    return this.jogodavelhaService.mostrarO(x, y);
  }
  get jogador(): number {
    return this.jogodavelhaService.player;
  }
  jogardenovo(): void {
    this.jogodavelhaService.newGame();
  }
  get numdejogadas(): number {
    return this.jogodavelhaService.vezesjogadas;
  }
}
