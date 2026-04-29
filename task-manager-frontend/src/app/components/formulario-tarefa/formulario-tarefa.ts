import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa';

@Component({
    selector: 'app-formulario-tarefa',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './formulario-tarefa.html',
    styleUrls: ['./formulario-tarefa.css']
})
export class FormularioTarefaComponent implements OnInit {
    @Input() tarefa: Tarefa | null = null;
    @Output() salvo = new EventEmitter<void>();
    @Output() cancelado = new EventEmitter<void>();

    form: Tarefa = {
        titulo: '',
        descricao: '',
        status: 'Pendente'
    };

    erroTitulo = false;
    mensagemSucesso = '';
    mensagemErro = '';

    constructor(
        private tarefaService: TarefaService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        if (this.tarefa) {
            this.form = { ...this.tarefa };
        }
    }

    salvar(): void {
        this.erroTitulo = false;
        this.mensagemErro = '';
        this.mensagemSucesso = '';

        if (!this.form.titulo.trim()) {
            this.erroTitulo = true;
            return;
        }

        if (this.form.id) {
            this.tarefaService.atualizar(this.form.id, this.form).subscribe({
                next: () => {
                    this.mensagemSucesso = 'Tarefa atualizada com sucesso!';
                    this.cdr.detectChanges();
                    setTimeout(() => this.salvo.emit(), 2000);
                },
                error: () => {
                    this.mensagemErro = 'Erro ao atualizar a tarefa. Tente novamente.';
                    this.cdr.detectChanges();
                }
            });
        } else {
            this.tarefaService.criar(this.form).subscribe({
                next: () => {
                    this.mensagemSucesso = 'Tarefa criada com sucesso!';
                    this.cdr.detectChanges();
                    setTimeout(() => this.salvo.emit(), 2000);
                },
                error: () => {
                    this.mensagemErro = 'Erro ao criar a tarefa. Tente novamente.';
                    this.cdr.detectChanges();
                }
            });
        }
    }

    cancelar(): void {
        this.cancelado.emit();
    }
}