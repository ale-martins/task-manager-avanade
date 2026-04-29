import { Component } from '@angular/core';
import { ListaTarefasComponent } from './components/lista-tarefas/lista-tarefas';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ListaTarefasComponent],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {}