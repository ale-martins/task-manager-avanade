import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa';
import { FormularioTarefaComponent } from '../formulario-tarefa/formulario-tarefa';

@Component({
    selector: 'app-lista-tarefas',
    standalone: true,
    imports: [CommonModule, FormsModule, FormularioTarefaComponent],
    templateUrl: './lista-tarefas.html',
    styleUrls: ['./lista-tarefas.css']
})
export class ListaTarefasComponent implements OnInit {
    tarefas: Tarefa[] = [];
    tarefasFiltradas: Tarefa[] = [];
    tarefaSelecionada: Tarefa | null = null;
    mostrarFormulario = false;
    filtroStatus = 'Todos';
    mensagemSucesso = '';

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
                this.aplicarFiltro();
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('erro ao carregar:', err);
            }
        });
    }

    aplicarFiltro(): void {
        if (this.filtroStatus === 'Todos') {
            this.tarefasFiltradas = [...this.tarefas];
        } else {
            this.tarefasFiltradas = this.tarefas.filter(t => t.status === this.filtroStatus);
        }
        this.cdr.detectChanges();
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
                    console.log('entrou no next');
                    this.mensagemSucesso = 'Tarefa excluída com sucesso!';
                    console.log('mensagemSucesso:', this.mensagemSucesso);
                    this.tarefas = this.tarefas.filter(t => t.id !== id);
                    this.aplicarFiltro();
                    this.cdr.detectChanges();
                    setTimeout(() => {
                        this.mensagemSucesso = '';
                        this.cdr.detectChanges();
                    }, 2000);
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