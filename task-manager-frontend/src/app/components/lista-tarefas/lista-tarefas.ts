import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa';
import { FormularioTarefaComponent } from '../formulario-tarefa/formulario-tarefa';

@Component({
  selector: 'app-lista-tarefas',
  standalone: true,
  imports: [CommonModule, FormularioTarefaComponent],
  templateUrl: './lista-tarefas.html',
  styleUrls: ['./lista-tarefas.css']
})
export class ListaTarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];
  tarefaSelecionada: Tarefa | null = null;
  mostrarFormulario = false;

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefaService.listar().subscribe(tarefas => {
      this.tarefas = tarefas;
    });
  }

  novaTarefa(): void {
    this.tarefaSelecionada = null;
    this.mostrarFormulario = true;
  }

  editarTarefa(tarefa: Tarefa): void {
    this.tarefaSelecionada = { ...tarefa };
    this.mostrarFormulario = true;
  }

  excluirTarefa(id: number): void {
    if (confirm('Deseja excluir esta tarefa?')) {
      this.tarefaService.excluir(id).subscribe(() => {
        this.carregarTarefas();
      });
    }
  }

  aoSalvar(): void {
    this.mostrarFormulario = false;
    this.tarefaSelecionada = null;
    this.carregarTarefas();
  }

  aoCancelar(): void {
    this.mostrarFormulario = false;
    this.tarefaSelecionada = null;
  }
}