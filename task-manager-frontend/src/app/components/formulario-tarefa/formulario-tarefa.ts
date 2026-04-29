import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../../models/tarefa.model';
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

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    if (this.tarefa) {
      this.form = { ...this.tarefa };
    }
  }

  salvar(): void {
    if (!this.form.titulo.trim()) return;

    if (this.form.id) {
      this.tarefaService.atualizar(this.form.id, this.form).subscribe(() => {
        this.salvo.emit();
      });
    } else {
      this.tarefaService.criar(this.form).subscribe(() => {
        this.salvo.emit();
      });
    }
  }

  cancelar(): void {
    this.cancelado.emit();
  }
}