import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JogoDaVelhaService {
  private jogador: number;
  private tela_inicial: boolean;
  private tela_de_escolha: boolean;
  private tela_de_pronto: boolean;
  private tela_de_jogo: boolean;
  private tela_final: boolean;
  private movimentos: number;
  private tabuleiro: any;
  private vitoria: any;
  private escolha: number;

  private vazio = 0;
  private jogador_x = 1;
  private jogador_o = 2;
  private tamanho_do_tabuleiro = 3;

  constructor() {}

  /**
   * Inicia o jogo, mostrando a tela incial.
   */
  iniciar(): void {
    this.tela_inicial = true;
    this.tela_de_escolha = false;
    this.tela_de_jogo = false;
    this.tela_final = false;
    this.movimentos = 0;
    this.jogador = this.jogador_x;
    this.vitoria = false;
    this.iniciartabuleiro();
  }

  /**
   * Define todos os valores iniciais do tabuleiro como 0(vazio);
   */
  iniciartabuleiro(): void {
    this.tabuleiro = [this.tamanho_do_tabuleiro];
    for (let i = 0; i < this.tamanho_do_tabuleiro; i++) {
      this.tabuleiro[i] = [this.vazio, this.vazio, this.vazio];
    }
  }

  /**
   * Mostra a tela incial.
   */
  get mostrarInicio(): boolean {
    return this.tela_inicial;
  }

  /**
   * Mostra o tabuleiro.
   */
  get mostrarPronto(): boolean {
    return this.tela_de_pronto;
  }

  /**
   * Mostra a tela de escolha dos jogadores.
   */
  get mostrarEscolha(): boolean {
    return this.tela_de_escolha;
  }

  /**
   * Mostra o tabuleiro.
   */
  get mostrarTabuleiro(): boolean {
    return this.tela_de_jogo;
  }

  /**
   * Mostra a tela final.
   */
  get mostrarfinal(): boolean {
    return this.tela_final;
  }

  /**
   * Mostra qual o jogador que está jogando
   */
  get player(): number {
    return this.jogador;
  }

  /**
   * Mostra a quantidade de movimentos feitos na partida.
   */
  get vezesjogadas(): number {
    return this.movimentos;
  }

  /**
   * Inicia a tela de escolhas.
   */
  iniciarEscolha(): void {
    this.tela_inicial = false;
    this.tela_de_escolha = true;
  }

  /**
   * Transforma o número de jogadores em 1.
   */
  get umJogador(): number {
    return (this.escolha = 1);
  }

  /**
   * Transforma o número de jogadores em 2.
   */
  get doisJogadores(): number {
    return (this.escolha = 2);
  }

  terminarEscolha(): void {
    this.tela_de_escolha = false;
    this.tela_de_pronto = true;
  }

  /**
   * Inicia o jogo.
   */
  iniciarJogo(): void {
    this.tela_de_pronto = false;
    this.tela_de_jogo = true;
  }

  /**
   *
   * @param posX  Posição horizontal em que o jogador fez a jogada.
   * @param posY  Posição vertical em que o jogador fez a jogada.
   * @returns void
   *
   * Recebe como parâmetro a posição x e y que o jogador fez a jogada.
   * Verifica se a posição recebida é válida e caso não seja, exibe uma mensagem de erro e retorna.
   * Se a jogada for válida a posição informada recebe o jogador que fez a jogada, incrementa o número de jogadas e chama o método fim para checar se teve fim de jogo.
   * checa qual jogador está jogando.
   * chega se teve vtória, empate e se o próximo jogador pode jogar
   */
  jogar(posX: number, posY: number): void {
    /**Jogada inválida */
    if (this.tabuleiro[posX][posY] !== this.vazio || this.vitoria) {
      alert('Jogada inválida');
      return;
    }
    this.tabuleiro[posX][posY] = this.jogador;
    this.movimentos = this.movimentos + 1;
    this.vitoria = this.fim(this.tabuleiro, posX, posY, this.jogador);
    this.jogador =
      this.jogador === this.jogador_x ? this.jogador_o : this.jogador_x;
    /**
     * Não teve vitória nem empate.
     */
    if (!this.vitoria && this.movimentos < 9 && this.escolha !== 2) {
      this.cpu();
    }
    /**
     * Vitória.
     */
    if (this.vitoria !== false) {
      this.tela_final = true;
    }
    /**
     * Empate.
     */
    if (!this.vitoria && this.movimentos === 9) {
      this.jogador = 0;
      this.tela_final = true;
    }
  }

  /**
   *
   * @param tabuleiro A matriz tabuleiro com os valore4s dados até o momento.
   * @param posX Posição horizontal.
   * @param posY Posição vertical.
   * @param jogador Jogador que está jogando
   * @returns Retorna uma matriz.
   * Checa se a vitória está na linha, coluna ou nas diagonais.
   * Se não existir vitória retorna false.
   * Se existir vitória retorna as posições em que a vitória está na matriz.
   */
  fim(tabuleiro: any, posX: number, posY: number, jogador: any): boolean {
    let fim: any = false;
    /**
     * Confere se a linha contém a vitória.
     */
    if (
      tabuleiro[posX][0] === jogador &&
      tabuleiro[posX][1] === jogador &&
      tabuleiro[posX][2] === jogador
    ) {
      fim = [
        [posX, 0],
        [posX, 1],
        [posX, 2],
      ];
    }
    /**
    /**
     * Confere se a coluna contém a vitória.
     */
    if (
      tabuleiro[0][posY] === jogador &&
      tabuleiro[1][posY] === jogador &&
      tabuleiro[2][posY] === jogador
    ) {
      fim = [
        [0, posY],
        [1, posY],
        [2, posY],
      ];
    }
    /**
     * Confere se a diagonal principal contém a vitória.
     */
    if (
      tabuleiro[0][0] === jogador &&
      tabuleiro[1][1] === jogador &&
      tabuleiro[2][2] === jogador
    ) {
      fim = [
        [0, 0],
        [1, 1],
        [2, 2],
      ];
    }
    /**
     * Confere se a diagonal inversa contém a vitória.
     */
    if (
      tabuleiro[0][2] === jogador &&
      tabuleiro[1][1] === jogador &&
      tabuleiro[2][0] === jogador
    ) {
      fim = [
        [0, 2],
        [1, 1],
        [2, 0],
      ];
    }

    return fim;
  }

  /**
   * Tenta jogar para obter a vitória.
   * Tenta jogar para evitar a derrota caso a vitória não seja viável.
   * Joga aleatoriamente.
   */
  cpu() {
    /**
     * Confere a jogada para a vitória.
     */
    let jogada: number[] = this.verjogada(this.jogador_o);
    /**
     * Confere a jogada para evitar a derrota.
     */
    if (jogada.length <= 0) {
      jogada = this.verjogada(this.jogador_x);
    }
    /**
     * Joga aleatoriamente.
     */
    if (jogada.length <= 0) {
      let jogadas: any = [];
      for (let i = 0; i < this.tamanho_do_tabuleiro; i++) {
        for (let j = 0; j < this.tamanho_do_tabuleiro; j++) {
          if (this.tabuleiro[i][j] === this.vazio) {
            jogadas.push([i, j]);
          }
        }
      }
      let k = Math.floor(Math.random() * (jogadas.length - 1));
      jogada = [jogadas[k][0], jogadas[k][1]];
    }
    this.tabuleiro[jogada[0]][jogada[1]] = this.jogador;
    this.movimentos = this.movimentos + 1;
    this.vitoria = this.fim(this.tabuleiro, jogada[0], jogada[1], this.jogador);
    this.jogador =
      this.jogador === this.jogador_x ? this.jogador_o : this.jogador_x;
  }

  /**
   *
   * @param jogador Jogador número 2(cpu);
   * @returns retorna as posições em caso de viória ou retorna um array em branco em nenhum caso de vtória;
   *
   * Checa jogada por jogada uma possível vitória.
   */
  verjogada(jogador: number): number[] {
    let tab = this.tabuleiro;
    for (let i = 0; i < this.tamanho_do_tabuleiro; i++) {
      for (let j = 0; j < this.tamanho_do_tabuleiro; j++) {
        if (tab[i][j] !== this.vazio) {
          continue;
        }
        tab[i][j] = jogador;
        if (this.fim(tab, i, j, jogador)) {
          return [i, j];
        }
        tab[i][j] = this.vazio;
      }
    }
    return [];
  }

  /**
   *
   * @param posX Posição no eixo x jogada.
   * @param posY Posição no eixo y jogada.
   * @returns Retorna false caso a vitória seja false e true caso a vitória seja true.
   *
   * Checa se a vitória deve ser exibida para o x e y passados.
   */
  mostrarVitoria(posX: number, posY: number): boolean {
    let exibirVitoria: boolean = false;
    if (!this.vitoria) {
      return exibirVitoria;
    }

    for (let pos of this.vitoria) {
      if (pos[0] === posX && pos[1] === posY) {
        exibirVitoria = true;
        break;
      }
    }
    return exibirVitoria;
  }

  /**
   * Cria um novo jogo.
   */
  newGame(): void {
    this.iniciar();
    this.tela_inicial = false;
    this.tela_de_jogo = true;
    this.tela_final = false;
  }

  /**
   *
   * Informa se 'o' deve ser exibido.
   *
   * @param posX Posição no eixo x da jogada.
   * @param posY Posição no eixo y da jogada.
   * @returns boolean
   */
  mostrarX(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.jogador_x;
  }

  /**
   *
   * Informa se 'x' deve ser exibido.
   *
   * @param posX Posição no eixo x da jogada.
   * @param posY Posição no eixo y da jogada.
   * @returns boolean
   */
  mostrarO(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.jogador_o;
  }
}
