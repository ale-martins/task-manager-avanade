import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

    constructor(
        private tarefaService: TarefaService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.carregarTarefas();
    }

    carregarTarefas(): void {
        this.tarefaService.listar().subscribe({
            next: (tarefas) => {
                this.tarefas = [...tarefas];
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('erro ao carregar:', err);
            }
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
            this.tarefaService.excluir(id).subscribe({
                next: () => {
                    this.carregarTarefas();
                },
                error: (err) => {
                    console.error('Erro ao excluir:', err);
                    alert('Erro ao excluir a tarefa. Tente novamente.');
                }
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