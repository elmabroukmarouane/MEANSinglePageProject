import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Personnes } from '../../personnes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  title: String = 'Liste des personnes';
  private message: String = '';
  personnes: Personnes[];
  upPersonne: any = {};
  angForm: FormGroup;
  upangForm: FormGroup;
  dataTable: any;
  private uri = 'http://localhost:4000/personnes';

  constructor(
    private chRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.createForm();
    this.createUpForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      age: ['', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  createUpForm() {
    this.upangForm = this.fb.group({
      upnom: ['', Validators.required],
      upprenom: ['', Validators.required],
      upemail: ['', Validators.required],
      uppassword: ['', Validators.required],
      upage: ['', Validators.required],
      upadresse: ['', Validators.required]
    });
  }

  fetchPersonnes(): void {
    this.http.get(`${this.uri}`).subscribe((data: Personnes[]) => {
      this.personnes = data;
      this.chRef.detectChanges();
      const table: any = $('table');
      this.dataTable = table.DataTable({
        language: {
          url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
        }
      });
    });
  }

  addPersonne(nom, prenom, email, password, age, adresse) {
    this.http
      .post(`${this.uri}`, {
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
        age: age,
        adresse: adresse
      })
      .subscribe((data: Personnes) => {
        this.personnes.push(data);
        this.toastr.success('Personne ajoutée avec succès !', 'Succès !');
        document.getElementById('annuler_modal').click();
      });
  }

  showPersonne(personne) {
    this.upPersonne = this.personnes.find(k => k === personne);
  }

  updatePersonne(nom, prenom, email, password, age, adresse, id) {
    const obj = {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password,
      age: age,
      adresse: adresse
    };
    this.http.put(`${this.uri}/${id}`, obj).subscribe((data: Personnes) => {
      this.toastr.success('Personne modifiée avec succès !', 'Succès !');
      document.getElementById('update_annuler_modal').click();
    });
  }

  deletePersonne(id, currentElementIndex) {
    if (confirm('Voulez-vous supprimer cette personnes ?')) {
      this.http.delete(`${this.uri}/${id}`).subscribe(data => {
        this.personnes.splice(currentElementIndex, 1);
        this.toastr.success('Personne supprimée avec succès !', 'Succès !');
      });
    }
  }

  ngOnInit() {
    this.fetchPersonnes();
  }
}
